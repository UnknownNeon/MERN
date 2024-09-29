import { Switch ,Box, Heading, HStack, IconButton, Image, Text, Button , useColorModeValue,useToast , useDisclosure, VStack, Input} from '@chakra-ui/react'
import React, { useState } from 'react'
import { EditIcon , DeleteIcon } from '@chakra-ui/icons'
import { useItemStore } from '../store/items';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
  import {NumberInput,NumberInputField,NumberInputStepper,NumberIncrementStepper,NumberDecrementStepper} from '@chakra-ui/react'

export const ItemCard = ({item}) => {

    const [updatedItem , setUpdatedItem] = useState(item);
    const textColor = useColorModeValue("gray.600","gray.200");
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { deleteItem } = useItemStore();

    const handleDelete = async (pid) => {
        const {success , message} = await deleteItem(pid)
        if(success){
            toast({
                title: success,
                description: message,
                status: 'success',
                duration: 3000,
                isClosable: true,
              })
        }
        else{
            toast({
                title: success,
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
        }
    }
    const {updateItem} = useItemStore();
    const handleUpdate = async (pid, updatedItem) => {
        const {success , message} = await  updateItem(pid,updatedItem);
        if(success){
            toast({
                title: success,
                description: message,
                status: 'success',
                duration: 3000,
                isClosable: true,
              })
        }
        else{
            toast({
                title: success,
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
        }
        onClose();
    }
  return (
    <Box
    shadow='lg'
    rounded='lg'
    overflow='hidden'
    transition='all 0.2s'
    _hover={{ transform: "translateY(-5px)" , shadow :"xl" }}>
        <Image src={item.image} alt={item.name} h={45} w='full' objectFit='cover'/>
        <Box p={4}>
            <Heading as='h3' size='md' mb={2}>
                {item.name}
            </Heading>
            <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                Severity: {item.severity}
            </Text>
            <Text fontSize='l' color={textColor} mb={4}>
             <b>Description: </b>{item.description}
             </Text>
            <HStack spacing={2}>
                <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
                <IconButton icon={<DeleteIcon />} onClick={() => handleDelete(item._id)} colorScheme='red' />
            </HStack>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <VStack>
            <Input placeholder='Update Name'
            name='name'
            value={updatedItem.name}
            onChange={(e)=> setUpdatedItem({...updatedItem , name: e.target.value})}/>
            <HStack>
            <NumberInput 
              allowMouseWheel
              w={"full"} defaultValue={1} min={1} max={10}
              name='severity'
              value={updatedItem.severity}
              onChange={(e) => setUpdatedItem({...updatedItem , severity : e})}
            >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            <Text > Update Status :</Text>
                <Switch id='status' 
                onChange={(e) => { item.status === "Incomplete" ? setUpdatedItem({...updatedItem , status : "Complete"}):
                                                                  setUpdatedItem({...updatedItem , status : "Incomplete"})}}> 
                                                                  </Switch>
            </HStack>
            <Input
            placeholder='Update Image SRC'
            name='image'
            value={updatedItem.image}
            onChange={(e)=> setUpdatedItem({...updatedItem , image: e.target.value})}
            />
            <Input
            placeholder='Update Description'
            name='description'
            value={updatedItem.description}
            onChange={(e)=> setUpdatedItem({...updatedItem , description: e.target.value})}
            />
           </VStack>  
          </ModalBody>

          <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={ () => handleUpdate(item._id , updatedItem)}>
              Update
          </Button>
          <Button variant='ghost' onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
    </Box>
  )
}

export default ItemCard