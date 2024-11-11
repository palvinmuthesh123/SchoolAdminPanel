import React, { useRef, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  useToast,
  Box,
  Select,
  Checkbox
} from '@chakra-ui/react';
import { useAdminContext } from '../context/admin_context';

function CreateNewAdminModal() {
  const {
    new_admin: { name, email, password, privilege, cooker, container, truck, school, kitchen, mobile },
    updateNewAdminDetails,
    createNewAdmin,
    fetchAdmins,
  } = useAdminContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const initialRef = useRef();
  const [selectedItems, setSelectedItems] = useState({
    cookers: cooker,
    containers: container,
    trucks: truck,
    schools: school,
    kitchens: kitchen,
  });

  const handleSubmit = async () => {
    if (!name || !email || !password || !privilege) {
      return toast({
        position: 'top',
        description: 'Enter all the details',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    setLoading(true);
    const response = await createNewAdmin();
    setLoading(false);

    if (response.success) {
      onClose();
      toast({
        position: 'top',
        description: `Account created: ${response.data.name}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      return await fetchAdmins();
    } else {
      onClose();
      return toast({
        position: 'top',
        description: response.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setSelectedItems((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <Box>
      <Button colorScheme='brown' onClick={onOpen}>
        Create New User
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New User account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder='Full Name'
                name='name'
                focusBorderColor='brown.500'
                value={name}
                onChange={updateNewAdminDetails}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder='Email'
                name='email'
                focusBorderColor='brown.500'
                value={email}
                onChange={updateNewAdminDetails}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder='Password'
                name='password'
                focusBorderColor='brown.500'
                value={password}
                onChange={updateNewAdminDetails}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Mobile</FormLabel>
              <Input
                placeholder='Mobile'
                name='mobile'
                focusBorderColor='brown.500'
                value={mobile}
                onChange={updateNewAdminDetails}
              />
            </FormControl>
            {/* <FormControl mt={4}>
              <FormLabel>Privilege</FormLabel>
              <Select
                name='privilege'
                focusBorderColor='brown.500'
                value={privilege}
                onChange={updateNewAdminDetails}
              >
                <option value='super'>Super</option>
                <option value='moderate'>Moderate</option>
                <option value='low'>Low</option>
              </Select>
            </FormControl> */}
            {/* <FormControl mt={4}>
              <FormLabel>Privileges</FormLabel>
              <Checkbox name="cookers" isChecked={selectedItems.cookers} onChange={handleChange}>
                Cookers
              </Checkbox><br/>
              <Checkbox name="containers" isChecked={selectedItems.containers} onChange={handleChange}>
                Containers
              </Checkbox><br/>
              <Checkbox name="trucks" isChecked={selectedItems.trucks} onChange={handleChange}>
                Trucks
              </Checkbox><br/>
              <Checkbox name="schools" isChecked={selectedItems.schools} onChange={handleChange}>
                Schools
              </Checkbox><br/>
              <Checkbox name="kitchens" isChecked={selectedItems.kitchens} onChange={handleChange}>
                Kitchens
              </Checkbox><br/>
            </FormControl> */}
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={loading}
              colorScheme='brown'
              onClick={handleSubmit}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default CreateNewAdminModal;
