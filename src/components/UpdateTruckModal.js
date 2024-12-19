import React, { useState, useRef, useCallback, useEffect } from 'react';
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
  Text,
  Select
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useTruckContext } from '../context/truck_context';
import { useKitchenContext } from '../context/kitchen_context';

function UpdateTruckModal({ id }) {
  const {
    single_truck: {
      truckId = '',
      description = '',
      driver_name = '',
      // driver_number = '',
      // driver_email = '',
      // driver_password = '',
      route = '',
      images = [],
      kitchenId = []
    },
    single_truck_loading,
    fetchTrucks,
    fetchSingleTruck,
    updateExistingTruckDetails,
    updateTruck,
  } = useTruckContext();
  const { kitchens } = useKitchenContext();
  const [selectedKitchens, setSelectedKitchens] = useState([]);
  const [imageList, setImageList] = useState(images);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(kitchenId.length>0 && kitchens.length>0) {
      const preSelectedSchools = kitchens.filter((item) =>
        kitchenId == item.kitchenId
      );
      setSelectedKitchens(preSelectedSchools);
    }
  }, [kitchenId, kitchens]);

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
      return [...prev];
    });
  };

  const handleSubmit = async () => {
    const selectedNames = selectedKitchens.map((kitchen) => kitchen.kitchenId);
    if (
      !truckId ||
      !description ||
      !driver_name ||
      // !driver_number ||
      // !driver_email ||
      !route
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
    var truck = {
      truckId,
      description,
      driver_name,
      // driver_number,
      // driver_email,
      route,
      images: imageList,
    };
    if(selectedNames) {
      Object.assign(truck, {kitchenId: selectedNames[0]})
    }
    const responseCreate = await updateTruck(id, truck);
    setLoading(false);
    if (responseCreate.success) {
      onClose();
      toast({
        position: 'top',
        description: 'Truck updated',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      await fetchTrucks();
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

  useEffect(() => {
    setImageList(images);
    // eslint-disable-next-line
  }, [single_truck_loading]);

  return (
    <>
      <Text
        colorScheme='brown'
        minW='100%'
        onClick={() => {
          fetchSingleTruck(id);
          onOpen();
        }}
      >
        Edit
      </Text>

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
                onChange={updateExistingTruckDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Truck Number</FormLabel>
              <Input
                placeholder='Truck Number'
                name='description'
                focusBorderColor='brown.500'
                value={description}
                onChange={updateExistingTruckDetails}
              />
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
              <FormLabel>Driver Name</FormLabel>
              <Input
                placeholder='Truck Driver Name'
                name='driver_name'
                focusBorderColor='brown.500'
                value={driver_name}
                onChange={updateExistingTruckDetails}
              />
            </FormControl>

            {/* <FormControl mt={4}>
              <FormLabel>Driver Number</FormLabel>
              <Input
                placeholder='Truck Driver Number'
                name='driver_number'
                focusBorderColor='brown.500'
                value={driver_number}
                onChange={updateExistingTruckDetails}
              />
            </FormControl> */}

            {/* <FormControl mt={4}>
              <FormLabel>Driver Email</FormLabel>
              <Input
                placeholder='Truck Driver Email'
                name='driver_email'
                focusBorderColor='brown.500'
                value={driver_email}
                onChange={updateExistingTruckDetails}
              />
            </FormControl> */}

            <FormControl mt={4}>
              <FormLabel>Route</FormLabel>
              <Input
                placeholder='Truck Route'
                name='route'
                focusBorderColor='brown.500'
                value={route}
                onChange={updateExistingTruckDetails}
              />
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
                        src={image?.url ? image.url : image}
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
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={loading}
              loadingText='Updating Truck'
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

export default UpdateTruckModal;
