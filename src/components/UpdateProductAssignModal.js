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
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useProductAssignContext } from '../context/productAssign_context';

function UpdateProductAssignModal({ id }) {
  const {
    single_productAssign: {
      cookerId = '',
      // price = '',
      // stock = 0,
      description = '',
      // colors = [],
      // sizes = [],
      // category = '',
      // company = '',
      images = [],
      // shipping = false,
      // featured = false,
    },
    single_productAssign_loading,
    fetchProductAssigns,
    fetchSingleProductAssign,
    updateExistingProductAssignDetails,
    updateProductAssign,
  } = useProductAssignContext();

  const [imageList, setImageList] = useState(images);
  const [loading, setLoading] = useState(false);

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
    if (
      !cookerId 
      ||
      // !price ||
      // !stock ||
      !description 
      // ||
      // colors.length < 1 ||
      // sizes.length < 1 ||
      // !category ||
      // !company
    ) {
      return toast({
        position: 'top',
        description: 'Provide all the details',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    // if (imageList.length < 1) {
    //   return toast({
    //     position: 'top',
    //     description: 'Add atleast one image',
    //     status: 'error',
    //     duration: 5000,
    //     isClosable: true,
    //   });
    // }
    setLoading(true);
    const productAssign = {
      cookerId,
      // price,
      // stock,
      description,
      // colors,
      // sizes,
      // category,
      // company,
      // shipping,
      // featured,
      images: imageList,
    };
    const responseCreate = await updateProductAssign(id, productAssign);
    setLoading(false);
    if (responseCreate.success) {
      onClose();
      toast({
        position: 'top',
        description: 'ProductAssign updated',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      await fetchProductAssigns();
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
  }, [single_productAssign_loading]);

  return (
    <>
      <Text
        colorScheme='brown'
        minW='100%'
        onClick={() => {
          fetchSingleProductAssign(id);
          onOpen();
        }}
      >
        Edit
      </Text>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new productAssign</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Cooker ID</FormLabel>
              <Input
                ref={initialRef}
                placeholder='ProductAssign Cooker ID'
                name='cookerId'
                focusBorderColor='brown.500'
                value={cookerId}
                onChange={updateExistingProductAssignDetails}
              />
            </FormControl>

            {/* <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input
                type='number'
                placeholder='ProductAssign Price'
                name='price'
                focusBorderColor='brown.500'
                value={price}
                onChange={updateExistingProductAssignDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Stock</FormLabel>
              <Input
                type='number'
                placeholder='ProductAssign Stock'
                name='stock'
                focusBorderColor='brown.500'
                value={stock}
                onChange={updateExistingProductAssignDetails}
              />
            </FormControl> */}

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder='ProductAssign Description'
                name='description'
                focusBorderColor='brown.500'
                value={description}
                onChange={updateExistingProductAssignDetails}
              />
            </FormControl>

            {/* <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <Input
                placeholder='ProductAssign Category'
                name='category'
                focusBorderColor='brown.500'
                value={category}
                onChange={updateExistingProductAssignDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Company</FormLabel>
              <Input
                placeholder='ProductAssign Company'
                name='company'
                focusBorderColor='brown.500'
                value={company}
                onChange={updateExistingProductAssignDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Sizes</FormLabel>
              <Input
                placeholder='ProductAssign Sizes (comma separated)'
                name='sizes'
                focusBorderColor='brown.500'
                value={sizes}
                onChange={updateExistingProductAssignDetails}
              />
              <FormHelperText>Eg: m, l, xl, xxl, xxxl</FormHelperText>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Colors</FormLabel>
              <Input
                placeholder='ProductAssign Colors (comma separated)'
                name='colors'
                focusBorderColor='brown.500'
                value={colors}
                onChange={updateExistingProductAssignDetails}
              />
              <FormHelperText>Eg: red,green,blue</FormHelperText>
              <FormHelperText>Eg: #FF000,#00FF00,#0000FF</FormHelperText>
            </FormControl> */}

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
                onChange={updateExistingProductAssignDetails}
              >
                Shipping
              </Checkbox>
            </FormControl>

            <FormControl mt={4}>
              <Checkbox
                name='featured'
                colorScheme='brown'
                isChecked={featured}
                onChange={updateExistingProductAssignDetails}
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
              loadingText='Updating ProductAssign'
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

export default UpdateProductAssignModal;
