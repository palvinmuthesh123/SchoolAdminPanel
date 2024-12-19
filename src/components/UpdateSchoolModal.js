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
import { useSchoolContext } from '../context/school_context';
import { useKitchenContext } from '../context/kitchen_context';

function UpdateSchoolModal({ id }) {
  const {
    single_school: {
      name = '',
      description = '',
      kitchenId = [],
      images = [],
    },
    single_school_loading,
    fetchSchools,
    fetchSingleSchool,
    updateExistingSchoolDetails,
    updateSchool,
  } = useSchoolContext();
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
      !name ||
      !description 
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
    var school = {
      name,
      description,
      images: imageList,
    };
    if(selectedNames) {
      Object.assign(school, {kitchenId: selectedNames[0]})
    }
    console.log(school, "SSSSSSSSSSSSS")
    const responseCreate = await updateSchool(id, school);
    setLoading(false);
    if (responseCreate.success) {
      onClose();
      toast({
        position: 'top',
        description: 'School updated',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      await fetchSchools();
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
  }, [single_school_loading]);

  return (
    <>
      <Text
        colorScheme='brown'
        minW='100%'
        onClick={() => {
          fetchSingleSchool(id);
          onOpen();
        }}
      >
        Edit
      </Text>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new school</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder='School Name'
                name='name'
                focusBorderColor='brown.500'
                value={name}
                onChange={updateExistingSchoolDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Mobile Number</FormLabel>
              <Input
                placeholder='School Mobile Number'
                name='description'
                focusBorderColor='brown.500'
                value={description}
                type="number"
                onChange={updateExistingSchoolDetails}
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

            {/* <FormControl mt={4}>
              <Checkbox
                name='shipping'
                colorScheme='brown'
                isChecked={shipping}
                onChange={updateExistingSchoolDetails}
              >
                Shipping
              </Checkbox>
            </FormControl>

            <FormControl mt={4}>
              <Checkbox
                name='featured'
                colorScheme='brown'
                isChecked={featured}
                onChange={updateExistingSchoolDetails}
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
              loadingText='Updating School'
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

export default UpdateSchoolModal;
