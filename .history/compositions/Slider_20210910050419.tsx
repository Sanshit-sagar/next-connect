


const SliderControlGroup = styled('div', {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    jc: 'flex-start',
    alignItems: 'space-between',
    touchAction: 'none'
});

function Thumb(props: any) {
    let inputRef = useRef(null)
    let { state, trackRef, index } = props
    let { thumbProps, inputProps } = useSliderThumb({ index, trackRef, inputRef }, state)
    let { focusProps, isFocusVisible } = useFocusRing();

    return (
      <div
        style={{
          position: 'absolute',
          top: 4,
          transform: 'translateX(-50%)',
          left: `${state.getThumbPercent(index) * 100}%`
        }}>
        <Box
          {...thumbProps}
          css={{
                width: 20,
                height: 20,
                borderRadius: '$1',
                border: '$1 solid',
                borderColor: 'pink',
                backgroundColor: isFocusVisible ? '$accent' : state.isThumbDragging(index) ? '$accent' : '$accentFull' 
            }}
        >
          <VisuallyHidden>
            <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
          </VisuallyHidden>
        </Box>
      </div>
    );
}

function RangeSlider(props: any) {

    let trackRef = useRef(null)
    let numberFormatter = useNumberFormatter(props.formatOptions)
    let state = useSliderState({ ...props, numberFormatter })
    let { groupProps, trackProps, labelProps, outputProps } = useSlider(props, state, trackRef);
  
    return (
        <CentralControlGroup>
           
            {props.label &&  
                <Label {...labelProps}>
                    {props.label}
                </Label>
            }
        
            <SliderControlGroup {...groupProps}>
                <Flex css={{ width: '100%', fd: 'row', jc: 'flex-end', ai: 'flex-start' }}>
                    <Text>
                        {`${state.getThumbValueLabel(0)} - ${state.getThumbValueLabel(1)}`}
                    </Text>
                </Flex>

                <div
                    {...trackProps}
                    ref={trackRef}
                    style={{
                        position: 'relative',
                        height: 30,
                        width: ' 100%'
                    }}    
                >
                    <Box
                        css={{
                            position: 'absolute',
                            bc: '$accent',
                            height: 2,
                            top: 13,
                            width: '100%'
                        }}
                    />
                        <Thumb index={0} state={state} trackRef={trackRef} />
                        <Thumb index={1} state={state} trackRef={trackRef} />
                </div>
            </SliderControlGroup>
        </CentralControlGroup>
    );
}