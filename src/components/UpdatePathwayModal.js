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
import { usePathwayContext } from '../context/pathway_context';
import { useSchoolContext } from '../context/school_context'
import Multiselect from 'multiselect-react-dropdown';
import { useKitchenContext } from '../context/kitchen_context';
import axios from 'axios';
import { schools_urls } from '../utils/constants';
function UpdatePathwayModal({ id }) {
  const { schools: school } = useSchoolContext();
  const [school1, setSchool1] = useState([]);
  const { kitchens } = useKitchenContext();
  const [selectedKitchens, setSelectedKitchens] = useState([]);
  const {
    single_pathway: {
      name = '',
      description = '',
      images = [],
      schools = [],
      kitchenId = []
    },
    single_pathway_loading,
    fetchPathways,
    fetchSinglePathway,
    updateExistingPathwayDetails,
    updatePathway,
  } = usePathwayContext();

  const [imageList, setImageList] = useState(images);
  const [loading, setLoading] = useState(false);
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    if(kitchenId.length>0 && kitchens.length>0 && !changed) {
      const preSelectedSchools = kitchens.filter((item) =>
        kitchenId == item.kitchenId
      );
      setSelectedKitchens(preSelectedSchools);
    }
  }, [kitchenId, kitchens]);

  useEffect(() => {
    if(school.length>0 && schools.length>0 && !changed) {
      const preSelectedSchools = school.filter((item) =>
        schools.some((selected) => selected?.toLowerCase() === item?.name?.toLowerCase())
      );
      setSelectedSchools(preSelectedSchools);
    }
  }, [school, schools]);

  // Handle selection
  const onSelect = (selectedList) => {
    if(selectedKitchens && selectedKitchens.length!=0) {
      setSelectedSchools(selectedList);
    }
    else {
      return toast({
        position: 'top',
        description: 'Please Select Kitchen',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const onRemove = (selectedList) => {
    setSelectedSchools(selectedList);
  };

  const fetchSchools = async (id) => {
    try {
      const response = await axios.get(schools_urls+'?kitchenId='+id);
      const { data } = response.data;
      setSchool1(data);
    } catch (error) {
      console.log(error, "EEEEEEEEEEEEE");
    }
  };

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
    const selectedNames = selectedSchools.map((school) => school.name);
    const selectedNames1 = selectedKitchens.map((kitchen) => kitchen.kitchenId);
    if (
      !name 
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
    var pathway = {
      name,
      description,
      images: imageList,
    };
    if(selectedNames.length>0) {
      Object.assign(pathway, {schools: selectedNames})
    }
    if(selectedNames1) {
      Object.assign(pathway, {kitchenId: selectedNames1[0]})
    }
    const responseCreate = await updatePathway(id, pathway);
    setLoading(false);
    if (responseCreate.success) {
      onClose();
      toast({
        position: 'top',
        description: 'Pathway updated',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      await fetchPathways();
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
  }, [single_pathway_loading]);

  return (
    <>
      <Text
        colorScheme='brown'
        minW='100%'
        onClick={() => {
          fetchSinglePathway(id);
          onOpen();
        }}
      >
        Edit
      </Text>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new route</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Route Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder='Route Name'
                name='name'
                focusBorderColor='brown.500'
                value={name}
                onChange={updateExistingPathwayDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder='Pathway Description'
                name='description'
                focusBorderColor='brown.500'
                value={description}
                onChange={updateExistingPathwayDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Kitchens</FormLabel>
              <Select
                placeholder="Select Kitchen"
                value={selectedKitchens[0]?.kitchenId || ''}
                onChange={(e) => {
                  setChanged(true);
                  const selectedKitchen = kitchens.find(
                    (kitchen) => kitchen.kitchenId === e.target.value
                  );
                  fetchSchools(selectedKitchen.kitchenId)
                  setSelectedKitchens(selectedKitchen ? [selectedKitchen] : []);
                  setSelectedSchools([]);
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
              <FormLabel>Schools</FormLabel>
              <Multiselect
                options={changed ? school1 : school}
                selectedValues={selectedSchools}
                onSelect={onSelect}
                onRemove={onRemove}
                displayValue="name"
                placeholder="Select Schools"
                style={{
                  searchBox: { background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '4px' },
                }}
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

            {/* <FormControl mt={4}>
              <Checkbox
                name='shipping'
                colorScheme='brown'
                isChecked={shipping}
                onChange={updateExistingPathwayDetails}
              >
                Shipping
              </Checkbox>
            </FormControl>

            <FormControl mt={4}>
              <Checkbox
                name='featured'
                colorScheme='brown'
                isChecked={featured}
                onChange={updateExistingPathwayDetails}
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
              loadingText='Updating Pathway'
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

export default UpdatePathwayModal;
