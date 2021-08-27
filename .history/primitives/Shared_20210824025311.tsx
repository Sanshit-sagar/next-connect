import { styled } from '../stitches.config'

export const DashboardDisplayBox = styled('div', {
    bc: '$canvas',
    fd: 'column', 
    jc: 'flex-start', 
    ai: 'flex-start', 
    margin: '$1',
    br: '$2',
}); 

export const VisxParentSizeWrapper = styled('div', {
    height: '450px',
    width: '675px',
    padding: 0,
    margin: 0
})


export const SkeletonContainer = styled('div', {
    bc: '$canvas', 
    br: '$1',
    padding: '$1',
    margin: '$1',
    fd: 'row',
    jc: 'center', 
    ai: 'center'
});