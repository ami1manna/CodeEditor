import { Box } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";

function App() {


  return (
    <>
    <Box
      minH="100vh"
      bg='#0f0a19'
      color='gray.500'
      px={6}
      py={8}
    >
      <CodeEditor/>
    </Box>
    <hr></hr>
    <Box p={1} textAlign='center'>
      
        <a href="https://github.com/ami1manna">Made By Amit Manna By ❤️ </a>
      
    </Box>
    </>
  )
}

export default App
