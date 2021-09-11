import React, { useRef } from 'react'

import { styled } from '../stitches.config'

import { Text } from '../primitives/Text'
import { Flex } from '../primitives/Flex'
import { BorderlessControlGroup, Label } from '../primitives/FieldSet'

import { SliderState, useSliderState } from '@react-stately/slider'
import { useSlider, useSliderThumb } from '@react-aria/slider'

import { useFocusRing } from '@react-aria/focus'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { mergeProps } from '@react-aria/utils'
import { useNumberFormatter } from '@react-aria/i18n'

const SliderControlGroup = styled('div', {
    height: '100%',
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

const ThumbContainer = styled('div', {
    position: 'absolute',
    top: 4,
    transform: 'translateX(-50%)'
});

const StyledThumb = styled('div', {
    width: 20,
    height: 20,
    border: '1px solid',
    borderRadius: '$1',
});

const SliderOutput = styled(Text, {
    color: '$accent',
    mb: '$2'
});

const TrackContainer = styled('div', {
    position: 'relative',
    height: 30,
    width: '100%'
})

interface IStyledColoredThumbProps {
    children: Element | any | React.ReactNode; 
    thumbProps: any;
    isFocusVisible: boolean;
    isThumbDragging: boolean; 
}


const StyledOutputText = ({ children, outputProps }: { children: any; outputProps: any }) => {
    return (
        <SliderOutput {...outputProps}>
            <Text size='1' css={{ color: '$accent', '&:hover': { color: '$funky' }}}> 
                {children} 
            </Text>
        </SliderOutput>
    );
}

const StyledColoredThumb = ({ children, thumbProps, isFocusVisible, isThumbDragging }: IStyledColoredThumbProps) => {
    return (
        <StyledThumb 
            {...thumbProps}
            css={{
                borderColor: isFocusVisible ? '$funky' : isThumbDragging ? '$border' : '$border3', 
                backgroundColor: isFocusVisible ? '$accent' : isThumbDragging ? '$accent' : '$accentFull' 
            }}
        >
            {children}
        </StyledThumb>
    )
}

function Thumb(props: any) {
    let inputRef = useRef(null)
    let { state, trackRef, index } = props
    let { thumbProps, inputProps } = useSliderThumb({ index, trackRef, inputRef }, state)
    let { focusProps, isFocusVisible } = useFocusRing();

    return (
        <ThumbContainer 
            css={{ left: `${state.getThumbPercent(index) * 100}%` }}
        >
            <StyledColoredThumb
                thumbProps={thumbProps}
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
        </ThumbContainer>
    );
}

interface SliderState {
    values: number[];
    focussedThumb: number | undefined;
    step: number;
    getThumbValue: (index: number) => number;
    setThumbValue: (index: number, value: number) => void;
}


interface IThumbsGroupProps {
    state: SliderState;
    trackRef: React.RefObject<HTMLElement>;
    thumbsCount: number; 
}

const ThumbsGroup = ({ state, trackRef, thumbsCount }: IThumbsGroupProps) => {
    const values = [...state.values] || []
    const focusedThumb = state?.focusedThumb || 0
    const step = state?.step

    return (
        <>
            <Text> Focussed:{focusedThumb} </Text>
            <Flex css={{ width: '100%', fd: 'row' }}>
                {[...Array(4)].map((thumbIndex: number, index: number) => { 
                    return (
                        <Thumb 
                            index={index}
                            state={state}
                            trackRef={trackRef} 
                        />
                    );
                })}
            </Flex>
        </>
    )
}

function formatValues(values: float[]): string {
    let formattedValues: string = ``;
    values.map((value, i) => {})
}

export function RangeSlider(props: any) {


    let trackRef = useRef(null)
    let numberFormatter = useNumberFormatter(props.formatOptions)
    let state = useSliderState({ ...props, numberFormatter })
    let { groupProps, trackProps, labelProps, outputProps } = useSlider(props, state, trackRef);

    let values = [...state.values] || []
  
    return (
        <BorderlessControlGroup>
            <Flex css={{ width: '100%', fd: 'row', jc: 'space-between', ai: 'flex-start', gap: '$2'}}>
                {props.label && <Label {...labelProps}>
                    {props.label}
                </Label>}
                <StyledOutputText 
                    outputProps={outputProps}
                    children={formatValues(values)}
                /> 
            </Flex>
            
            <SliderControlGroup {...groupProps}>
                <TrackContainer
                    {...trackProps}
                    ref={trackRef}    
                >
                    <Track /> 
                    <ThumbsGroup 
                        props={props}
                        state={state} 
                        trackRef={trackRef} 
                        thumbsCount={4}
                    />
                </TrackContainer>
            </SliderControlGroup>
        </BorderlessControlGroup>
    );
}