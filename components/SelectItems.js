import { Select, CheckIcon } from "native-base";
import { View } from "react-native";
import { useState } from "react";

export default ({listName, items}) => {
    const [chosenVal, setChosenVal] = useState(listName);

    return (
        <View>
            <Select selectedValue={chosenVal} minWidth="200" 
            accessibilityLabel={chosenVal} 
            placeholder={chosenVal}
            _selectedItem={{
                bg: "#00FFC2",
                endIcon: <CheckIcon size="3" />
            }} 
            mt={1} 
            onValueChange={itemValue => setChosenVal(itemValue)}>
                {
                    items.map((item, index)=> (
                        <Select.Item key={index} label={item} value={item}/>
                    )) 
                }
                
            </Select>
        </View>
    )
}