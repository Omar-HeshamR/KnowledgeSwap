import React from 'react'
import styled, {keyframes} from 'styled-components';
import AsyncSelect from 'react-select/async'
import Select, { components  } from 'react-select';
import makeAnimated from 'react-select/animated';

const TopicSelector = ({topic, setTopic}) => {

    const animatedComponents = makeAnimated();

    const getTopic = (selectedOption) => {
        let i = 0;
        let labels = []
        for(i=0;i<selectedOption.length;i++){
            labels.push(selectedOption[i].label)
        }
        setTopic(labels)
      }

    const options = [
        { value: 'math', label: 'Math' },
        { value: 'physics', label: 'Physics' },
        { value: 'chemistry', label: 'Chemistry' },
        { value: 'biology', label: 'Biology' },
        { value: 'english', label: 'English' },
        { value: 'history', label: 'History' },
        { value: 'geography', label: 'Geography' },
        { value: 'literature', label: 'Literature' },
        { value: 'medicine', label: 'Medicine' },
        { value: 'government', label: 'Government' },
        { value: 'politics', label: 'Politics' },
        { value: 'psychology', label: 'Psychology' },
        { value: 'astrology', label: 'Astrology' },
        { value: 'geology', label: 'Geology' },
        { value: 'research', label: 'Research' },
        { value: 'relationships', label: 'Relationships' },
        { value: 'socializing', label: 'Socializing' },
        { value: 'travel', label: 'Travel' },
        { value: 'maintenance', label: 'Maintenance' },
        { value: 'repair', label: 'Repair' },
        { value: 'automobile', label: 'Automobile' },
        { value: 'finances', label: 'Finances' },
        { value: 'legal', label: 'Legal' },
        { value: 'school', label: 'School' },
        { value: 'driving', label: 'Driving' },
        { value: 'communication', label: 'Communication' },
        { value: 'speaking', label: 'Speaking' },
        { value: 'presenting', label: 'Presenting' },
        { value: 'emotions', label: 'Emotions' },
        { value: 'food', label: 'Food' },
        { value: 'cooking', label: 'Cooking' },
        { value: 'beauty', label: 'Beauty' },
        { value: 'cosmetics', label: 'Cosmetics' },
        { value: 'sports', label: 'Sports' },
        { value: 'bodybuilding', label: 'Bodybuilding' },
        { value: 'exercise', label: 'Exercise' },
        { value: 'nutrition', label: 'Nutrition' },
        { value: 'health', label: 'Health' },
        { value: 'faith', label: 'Faith' },
        { value: 'news', label: 'News' },
        { value: 'advice', label: 'Advice' },
        { value: 'crypto', label: 'Crypto' },
        { value: 'blockchain', label: 'Blockchain' },
        { value: 'programming', label: 'Programming' },
        { value: 'software', label: 'Software' },
        { value: 'hardware', label: 'Hardware' },
        { value: 'IT', label: 'IT' },
        { value: 'AI', label: 'AI' },
        { value: 'frontend', label: 'Frontend' },
        { value: 'backend', label: 'Backend' },
        { value: 'webDev', label: 'WebDev' },
        { value: 'technology', label: 'Technology' },
        { value: 'gaming', label: 'Gaming' },
      ]
      
    const loadOptions = (searchValue, callback) => {
        setTimeout(() => {
          const filteredOptions = options.filter(option => option.label.toLowerCase().includes(searchValue.toLowerCase())
          );
          callback(filteredOptions);
        }, 2000)
      }

  return (
    <SelectDiv>
         <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      defaultValue={[]}
      isMulti
      onChange={getTopic} 
      placeholder= {<Check color='#A51C30'>Filter by topic.....</Check>}
      loadOptions={loadOptions}
      options={options}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: 'gainsboro',
          height: '100%',
          minHeight: '3.5vw',                 
          borderRadius: '0vw',
          border: state.isFocused ? '0.15vw solid #A51C30' : '',
          ":hover":{
            borderColor: '#A51C30',
          },
        }),
        dropdownIndicator: base => ({ ...base, color: `${props => props.theme.textColor}` }),
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary: `${props => props.theme.textColor}`,
          },
        })}
        />
  </SelectDiv>
  )
}


const SelectDiv = styled.div`
justify-content: center;
align-items: center;
width: 100%;
::placeholder { 
  opacity: 0; /* Firefox */
}
`
const Check = styled.div`
color: #A51C30;
`

export default TopicSelector