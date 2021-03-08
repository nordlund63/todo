import React from 'react';
import { Flex, Box } from "@chakra-ui/react";
import TodoList from "./components/TodoList";

function App() {
  return (
    <Box bg="gray.100" minHeight="100vh">
      <Flex flexDirection="column" minHeight="100vh" justifyContent="center" alignItems="center">
        <TodoList /> 
      </Flex>
    </Box>
  );
}

export default App;
