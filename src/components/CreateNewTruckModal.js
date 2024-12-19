import React, { useState, useRef, useCallback } from 'react';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Textarea,
  Center,
  HStack,
  Image,
  VStack,
  Checkbox,
  Select
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useTruckContext } from '../context/truck_context';
import { useKitchenContext } from '../context/kitchen_context';
import { usePathwayContext } from '../context/pathway_context';

function CreateNewTruckModal() {
  const {
    new_truck: {
      truckId,
      driver_name,
      driver_number,
      driver_email,
      driver_password,
      route,
      description,
    },
    updateNewTruckDetails,
    createNewTruck,
  } = useTruckContext();
  const { pathways } = usePathwayContext();
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { kitchens } = useKitchenContext();

  const [selectedKitchens, setSelectedKitchens] = useState([]);
  const [selectedRoutes, setSelectedRoutes] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImageList((prev) => {
          return [...prev, reader.result];
        });
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const toast = useToast();

  const removeImage = (index) => {
    setImageList((prev) => {
      prev.splice(index, 1);
      console.log(prev);
      return [...prev];
    });
  };

  const handleSubmit = async () => {
    const selectedNames = selectedKitchens.map((kitchen) => kitchen.kitchenId);
    const selectedNames1 = selectedRoutes.map((route) => route.name);
    if (
      !truckId ||
      !driver_name ||
      !driver_number ||
      !selectedNames1 ||
      !selectedNames ||
      !driver_email ||
      !driver_password
    ) {
      return toast({
        position: 'top',
        description: 'Provide all the details',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
   
    setLoading(true);
    console.log('uploading');
    const truck = {
      truckId,
      description,
      driver_name,
      driver_number,
      driver_email,
      driver_password,
      route: selectedNames1[0],
      kitchenId: selectedNames[0],
      images: imageList,
    };
    const responseCreate = await createNewTruck(truck);
    setLoading(false);
    if (responseCreate.success) {
      onClose();
      return toast({
        position: 'top',
        description: 'Truck created',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else {
      return toast({
        position: 'top',
        description: responseCreate.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button colorScheme='brown' onClick={onOpen}>
        Create New Truck
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new truck</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Truck ID</FormLabel>
              <Input
                ref={initialRef}
                placeholder='Truck ID'
                name='truckId'
                focusBorderColor='brown.500'
                value={truckId}
                onChange={updateNewTruckDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Truck Number</FormLabel>
              <Input
                placeholder='Truck Number'
                name='description'
                focusBorderColor='brown.500'
                value={description}
                onChange={updateNewTruckDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Driver Name</FormLabel>
              <Input
                placeholder='Truck Driver Name'
                name='driver_name'
                focusBorderColor='brown.500'
                value={driver_name}
                onChange={updateNewTruckDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Driver Number</FormLabel>
              <Input
                placeholder='Truck Driver Number'
                name='driver_number'
                focusBorderColor='brown.500'
                value={driver_number}
                onChange={updateNewTruckDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Driver Email</FormLabel>
              <Input
                placeholder='Truck Driver Email'
                name='driver_email'
                focusBorderColor='brown.500'
                value={driver_email}
                onChange={updateNewTruckDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Driver Password</FormLabel>
              <Input
                placeholder='Truck Driver Password'
                name='driver_password'
                focusBorderColor='brown.500'
                value={driver_password}
                onChange={updateNewTruckDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Route</FormLabel>
              <Select
                placeholder="Select Route"
                value={selectedRoutes[0]?.name || ''}
                onChange={(e) => {
                  const selectedRoute = pathways.find(
                    (kitchen) => kitchen.name === e.target.value
                  );
                  setSelectedRoutes(selectedRoute ? [selectedRoute] : []);
                }}
                focusBorderColor="brown.500"
                width="100%"
                sx={{
                  option: {
                    width: "100%",
                  },
                }}
              >
                {pathways.map((path) => (
                  <option key={path.name} value={path.name}>
                    {path.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Kitchens</FormLabel>
              <Select
                placeholder="Select Kitchen"
                value={selectedKitchens[0]?.kitchenId || ''}
                onChange={(e) => {
                  const selectedKitchen = kitchens.find(
                    (kitchen) => kitchen.kitchenId === e.target.value
                  );
                  setSelectedKitchens(selectedKitchen ? [selectedKitchen] : []);
                }}
                focusBorderColor="brown.500"
                width="100%"
                sx={{
                  option: {
                    width: "100%",
                  },
                }}
              >
                {kitchens.map((kitchen) => (
                  <option key={kitchen.kitchenId} value={kitchen.kitchenId}>
                    {kitchen.description}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Images</FormLabel>
              <Center
                bg='brown.50'
                minHeight={100}
                my={5}
                borderWidth={3}
                borderColor='brown.200'
                borderStyle='dashed'
                borderRadius='lg'
                {...getRootProps()}
              >
                {isDragActive ? (
                  <p>Drag your files here</p>
                ) : (
                  <p>
                    Drag drop image files here, or click to select files
                    <br />
                    (Only *.jpeg and *.png images will be accepted)
                  </p>
                )}
              </Center>
              <Input {...getInputProps()} />
            </FormControl>

            <FormControl mt={4}>
              <HStack>
                {imageList.map((image, index) => {
                  return (
                    <VStack key={index} spacing={3}>
                      <Image
                        src={image}
                        boxSize='70px'
                        objectFit='cover'
                        borderRadius='lg'
                      />
                      <Button
                        size='xs'
                        variant='outline'
                        colorScheme='red'
                        onClick={() => removeImage(index)}
                      >
                        Remove
                      </Button>
                    </VStack>
                  );
                })}
              </HStack>
            </FormControl>

            {/* <FormControl mt={4}>
              <Checkbox
                name='shipping'
                colorScheme='brown'
                isChecked={shipping}
                onChange={updateNewTruckDetails}
              >
                Shipping
              </Checkbox>
            </FormControl>

            <FormControl mt={4}>
              <Checkbox
                name='featured'
                colorScheme='brown'
                isChecked={featured}
                onChange={updateNewTruckDetails}
              >
                Featured
              </Checkbox>
            </FormControl> */}
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={loading}
              loadingText='Creating Truck'
              colorScheme='brown'
              onClick={handleSubmit}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateNewTruckModal;
