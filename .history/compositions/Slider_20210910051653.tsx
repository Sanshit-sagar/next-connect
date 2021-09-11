import React, { useRef } from 'react'

import { styled } from '../../stitches.config'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'
import { CentralControlGroup, Label } from '../../primitives/FieldSet'

import { useSliderState } from '@react-stately/slider'
import { useSlider, useSliderThumb } from '@react-aria/slider'

import { useFocusRing } from '@react-aria/focus'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { mergeProps } from '@react-aria/utils'
import { useNumberFormatter } from '@react-aria/i18n'

const SliderControlGroup = styled('div', {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    jc: 'flex-start',
    alignItems: 'space-between',
    touchAction: 'none'
});

const Track = styled('div', {
    position: 'absolute',
    bc: '$accent',
    height: 2,
    top: 13,
    width: '100%'
});

const StyledThumb = styled('div', {
    width: 20,
    height: 20,
    border: '1px solid',
    borderRadius: '$1',
});

const SliderOutput = styled('div', {
    width: '100%', 
    fd: 'row', 
    jc: 'flex-end', 
    ai: 'flex-start'
})

interface IStyledColoredThumbProps {
    thumbProps: any;
    isFocusVisible: boolean;
    isThumbDragging: boolean; 
}

const StyledColoredThumb = ({ thumbProps, isFocusVisible, isThumbDragging }: IStyledColoredThumbProps) => {
    return (
        <StyledThumb 
            {...thumbProps}
            css={{
                borderColor: isFocusVisible ? '$funky' : isThumbDragging ? '$border' : '$border3', 
                backgroundColor: isFocusVisible ? '$accent' : isThumbDragging ? '$accent' : '$accentFull' 
            }}
        />
    )
}

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
        <StyledColoredThumb
            thumbProps={...thumbProps}
            isFocusVisible={isFocusVisible}
            isThumbDragging={state.isThumbDragging(index)}
        >
          <VisuallyHidden>
            <input 
                ref={inputRef} 
                {...mergeProps(inputProps, focusProps)} 
            />
          </VisuallyHidden>
        </StyledColoredThumb>
      </div>
    );
}

export function RangeSlider(props: any) {

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
                <SiderOutput>
                    <Text>
                        {`${state.getThumbValueLabel(0)} - ${state.getThumbValueLabel(1)}`}
            
                </SliderOutput>

                <div
                    {...trackProps}
                    ref={trackRef}
                    style={{
                        position: 'relative',
                        height: 30,
                        width: ' 100%'
                    }}    
                >
                    <Track /> 
                    <Thumb index={0} state={state} trackRef={trackRef} />
                    <Thumb index={1} state={state} trackRef={trackRef} />
                </div>
            </SliderControlGroup>
        </CentralControlGroup>
    );
}