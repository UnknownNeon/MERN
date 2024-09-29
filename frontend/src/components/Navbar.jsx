import { Button, Container, Flex, HStack, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { CiSquarePlus } from "react-icons/ci";
import { AiOutlineFileDone } from "react-icons/ai";

const Navbar = () => {
  //This is a Hook from ChakraUI
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Container maxW={"1140px"}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}
        flexDir={{base:"column" , sm:"row"}}>
          <Text fontSize={{base:"22" , sm:"28"}}
                fontWeight={"bold"}
                textAlign={"center"}
                bgGradient={'linear(to-l, #7928CA, #FF0080)'}
                bgClip={'text'}>
            <Link to={"/"}>NOTEBOOK 📝</Link>
          </Text>

          <HStack spacing={"2"}
          alignItems={"center"}>
            <Link to={"/done"}>
            <Button>
            <AiOutlineFileDone />
            </Button>
            </Link>
            <Link to={"/create"}>
              <Button>
              <CiSquarePlus fontSize={20} />
              </Button>
            </Link>
              <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? "☀️" : "🌚"}
              </Button>
          </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar