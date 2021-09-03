import React, { useState } from 'react'

import { Box } from '../../primitives/Box'
import { UrlFieldSet as FieldSet, Label } from '../../primitives/FieldSet' 
import { TextField } from '../../primitives/TextField'
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'

const examples = [
    'medium1, medium2',
    'term1, term2',
    'source1, source2',
    'campaign1, campaign2',
    'content1', 'content2',
];
const EMPTY_SEO_TA
const titles = { 
    medium: 'Medium', term: 'Term', source: 'Source', 
    campaign: 'Campaign', content: 'Content', 
    template: 'Template'}

const CurrentTemplate = ({ templateId, updateId }: { templateId: number; updateId: (value:string) => void }) => {

    return (
        <Text size='1' css={{ color: '$text'}}>
            Template Id: {templateId !== '-1' ? templateId : 'N/A'}
        </Text>
    )
}

const SeoTabContent = () => {
    const [templateId, setTemplateId] = useState('-1');
    const [seo, setSeo] = useState(EMPTY_SEO_TAGS)

    const handleSeoTagUpdate = (event: React.ChangeEventHandler<HTMLInputElement>, id: string) => {
        setSeo({
            ...seo,
            [id]: event.currentTarget.value
        });
    }
    return (
        <Box css={{ width: '100%', height: '100%', margin: '$1', padding: '$1 $2' }}>
            <CurrentTemplate 
                id={templateId} 
                updateId={setTemplateId} 
            />

            <Flex css={{ fd: 'row', jc: 'space-between', ai: 'flex-start', gap: '$1', flexWrap: 'wrap' }}>
                {Object.entries(seo).map((seoEntry, i) => {
                    return (
                        <FieldSet css={{ width: '49%', border: 'thin solid', borderColor: '$accent', padding: '$2', mb: '$2', bc: '$panel', br: '$2' }}> 
                            <Label>
                                <Text
                                     size='1' 
                                     css={{ fontWeight: 200, fontStyle: 'light', color: '$text'}}
                                > 
                                     {seoEntry[0]} 
                                </Text>
                            </Label>

                            <TextField
                                size='1'
                                type='text'
                                value={seoEntry[1] || ''}
                                onChange={(event: React.ChangeEventHandler<HTMLInputElement>) => {
                                    handleSeoTagUpdate(event, seoEntry[0]);
                                }}
                                placeholder={`e.g: ${examples[i]}`} 
                                css={{ 
                                    mt: '$2',
                                    border: '1px solid', 
                                    borderColor: '$border', 
                                    backgroundColor: '$panel',
                                    '&:hover': { 
                                        backgroundColor: '$hiContrast',
                                        borderColor: '$loContrast',
                                    },

                                }}
                            />
                        </FieldSet>
                    );
                })}
            </Flex>


        </Box>
    );
}

export default SeoTabContent