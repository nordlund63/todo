import React from 'react';
import { Checkbox, Text, Flex } from '@chakra-ui/react';

export default function TodoItem(props){

    function onMarkTodo(e) {
        props.onMarkTodo(props);
    }

    const text = props.done ? <Text as="s" fontSize="lg">{props.title}</Text> : <Text fontSize="lg">{props.title}</Text> ; 

    return(
        <Flex
        width="300px"
        flexDirection="row"
        justifyContent="space-between">
            {text}
            <Checkbox as="div" isChecked={props.done}  onClick={onMarkTodo}/>
        </Flex>
    );
}