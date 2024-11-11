import React, { useState, useEffect, useRef } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { formatPrice } from '../utils/helpers';
import { useProductAssignContext } from '../context/productAssign_context';
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
import UpdateProductAssignModal from './UpdateProductAssignModal';
import QRCode from 'react-qr-code';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function ProductAssignsTable({ productAssigns }) {
  const toast = useToast();
  const { fetchProductAssigns, deleteProductAssign } = useProductAssignContext();
  const [loading, setLoading] = useState(false);
  const qrRefs = useRef({});

  const handleDownloadPDF = async (productAssignId) => {
    const qrCanvas = qrRefs.current[productAssignId]?.current;
  
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
        pdf.save(`${productAssignId}_qr_code.pdf`);
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    }, 300); // Delay of 300ms
  };

  const handleDelete = async (id) => {
    console.log(id, "IIIIIIIIIIIIII")
    setLoading(true);
    const response = await deleteProductAssign(id);
    setLoading(false);
    if (response.success) {
      toast({
        position: 'top',
        description: response.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      return await fetchProductAssigns();
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

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getUTCFullYear();
    let hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    // Determine AM/PM and adjust hours to 12-hour format
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format and handle midnight (0 becomes 12)
    hours = String(hours).padStart(2, '0');

    // Format day with suffix
    const daySuffix = day % 10 === 1 && day !== 11 ? "st" : 
                      day % 10 === 2 && day !== 12 ? "nd" : 
                      day % 10 === 3 && day !== 13 ? "rd" : "th";
    
    return `${day}${daySuffix} ${month} ${year} ${hours}:${minutes}:${seconds} ${ampm}`;
  }

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
              <Th>Food</Th>
              <Th>Assigned On</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {productAssigns ? productAssigns.map((productAssign, index) => {
              const { image, cookerID, _id, foodType, createdAt } = productAssign;
              if (!qrRefs.current[cookerID]) {
                qrRefs.current[cookerID] = React.createRef();
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
                      <Text as='b'>{cookerID}</Text>
                    </VStack>
                  </Td>
                  <Td>
                    <VStack alignItems='flex-start' spacing={1}>
                      <Text as='b'>{foodType}</Text>
                    </VStack>
                  </Td>
                  <Td>
                    <VStack alignItems='flex-start' spacing={1}>
                      <Text as='b'>{formatDate(createdAt)}</Text>
                    </VStack>
                  </Td>
                  {/* <Td>
                    <div ref={qrRefs.current[cookerID]}>
                      <QRCode
                        value={JSON.stringify({
                          cooker_id: cookerID
                        })}
                        size={128} // Adjust size as necessary
                      />
                    </div>
                  </Td> */}
                  <Td>
                    <Menu>
                      <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                        Actions
                      </MenuButton>
                      <MenuList>
                        {/* <Link to={`/productAssigns/${id}`}>
                          <MenuItem>View</MenuItem>
                        </Link> */}
                        {/* <MenuItem>
                          <UpdateProductAssignModal id={id} />
                        </MenuItem> */}
                        <MenuItem onClick={() => handleDelete(_id)}>
                          Delete
                        </MenuItem>
                        {/* <MenuItem onClick={() => handleDownloadPDF(cookerID)}>
                          Download QR
                        </MenuItem> */}
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

export default ProductAssignsTable;
