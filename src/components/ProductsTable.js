import React, { useState, useEffect, useRef } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { formatPrice } from '../utils/helpers';
import { useProductContext } from '../context/product_context';
import { Link } from 'react-router-dom';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  SimpleGrid,
  VStack,
  HStack,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import UpdateProductModal from './UpdateProductModal';
import QRCode from 'react-qr-code';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function ProductsTable({ products }) {
  const toast = useToast();
  const { fetchProducts, deleteProduct } = useProductContext();
  const [loading, setLoading] = useState(false);
  const qrRefs = useRef({});

  const handleDownloadPDF = async (productId) => {
    const qrCanvas = qrRefs.current[productId]?.current;
  
    if (!qrCanvas || !document.body.contains(qrCanvas)) {
      console.error('QR code element is not attached to the DOM');
      return;
    }
  
    // Wait for a short delay to ensure QR code is rendered
    setTimeout(async () => {
      try {
        const canvas = await html2canvas(qrCanvas);
        const imgData = canvas.toDataURL('image/png');
  
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10, 180, 180);
        pdf.save(`${productId}_qr_code.pdf`);
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    }, 300); // Delay of 300ms
  };

  const handleDelete = async (id) => {
    setLoading(true);
    const response = await deleteProduct(id);
    setLoading(false);
    if (response.success) {
      toast({
        position: 'top',
        description: response.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      return await fetchProducts();
    } else {
      return toast({
        position: 'top',
        description: response.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <SimpleGrid bg='white' p={5} shadow='lg' borderRadius='lg' overflowX='auto'>
      {loading ? (
        <HStack my={8} alignItems='center' justifyContent='center'>
          <Spinner size='lg' color='brown.500' />
        </HStack>
      ) : (
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Cooker ID</Th>
              <Th>Description</Th>
              <Th>QR</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {products ? products.map((product, index) => {
              const { image, cookerId, id, description } = product;
              if (!qrRefs.current[cookerId]) {
                qrRefs.current[cookerId] = React.createRef();
              }
              return (
                <Tr key={index}>
                  <Td>
                  {image ? 
                    <Image
                      src={image}
                      boxSize='100px'
                      objectFit='cover'
                      borderRadius='lg'
                    /> : 
                    <Image
                      src={require('../assets/cooker.png')}
                      boxSize='100px'
                      objectFit='cover'
                      borderRadius='lg'
                    />}
                  </Td>
                  <Td>
                    <VStack alignItems='flex-start' spacing={1}>
                      <Text as='b'>{cookerId}</Text>
                    </VStack>
                  </Td>
                  <Td>
                    <VStack alignItems='flex-start' spacing={1}>
                      <Text as='b'>{description}</Text>
                    </VStack>
                  </Td>
                  <Td>
                    <div ref={qrRefs.current[cookerId]}>
                      <QRCode
                        value={JSON.stringify({
                          cooker_id: cookerId
                        })}
                        size={128} // Adjust size as necessary
                      />
                    </div>
                  </Td>
                  <Td>
                    <Menu>
                      <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                        Actions
                      </MenuButton>
                      <MenuList>
                        <Link to={`/products/${id}`}>
                          <MenuItem>View</MenuItem>
                        </Link>
                        <MenuItem>
                          <UpdateProductModal id={id} />
                        </MenuItem>
                        <MenuItem onClick={() => handleDelete(id)}>
                          Delete
                        </MenuItem>
                        <MenuItem onClick={() => handleDownloadPDF(cookerId)}>
                          Download QR
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              );
            }) : null}
          </Tbody>
        </Table>
      )}
    </SimpleGrid>
  );
}

export default ProductsTable;
