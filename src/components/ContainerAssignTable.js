import React, { useState, useEffect, useRef } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { formatPrice } from '../utils/helpers';
import { useContainerAssignContext } from '../context/containerAssign_context';
import { Link } from 'react-router-dom';
// import coocker from '../assets/logo.svg';
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
import UpdateContainerAssignModal from './UpdateContainerAssignModal';
import QRCode from 'react-qr-code';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function ContainerAssignsTable({ containerAssigns }) {
  const toast = useToast();
  const { fetchContainerAssigns, deleteContainerAssign } = useContainerAssignContext();
  const [loading, setLoading] = useState(false);
  const qrRefs = useRef({});

  // const handleDownloadPDF = async (containerAssignId) => {
  //   const qrCanvas = qrRefs.current[containerAssignId]?.current;
  
  //   if (!qrCanvas || !document.body.contains(qrCanvas)) {
  //     console.error('QR code element is not attached to the DOM');
  //     return;
  //   }
  
  //   // Wait for a short delay to ensure QR code is rendered
  //   setTimeout(async () => {
  //     try {
  //       const canvas = await html2canvas(qrCanvas);
  //       const imgData = canvas.toDataURL('image/png');
  
  //       const pdf = new jsPDF();
  //       pdf.addImage(imgData, 'PNG', 10, 10, 180, 180);
  //       pdf.save(`${containerAssignId}_qr_code.pdf`);
  //     } catch (error) {
  //       console.error('Error generating PDF:', error);
  //     }
  //   }, 300); // Delay of 300ms
  // };

  const handleDelete = async (id) => {
    setLoading(true);
    const response = await deleteContainerAssign(id);
    setLoading(false);
    if (response.success) {
      toast({
        position: 'top',
        description: response.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      return await fetchContainerAssigns();
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
              <Th>Container Assign ID</Th>
              <Th>Cooker ID</Th>
              <Th>Assigned On</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {containerAssigns.map((containerAssign, index) => {
              const { image, containerID, _id, cookerID, createdAt } = containerAssign;
              if (!qrRefs.current[containerID]) {
                qrRefs.current[containerID] = React.createRef();
              }
              return (
                <Tr key={index}>
                  <Td>
                    {image ? 
                    <Image
                      src={image}
                      boxSize='90px'
                      objectFit='cover'
                      borderRadius='lg'
                    /> : 
                    <Image
                      src={require('../assets/containers.png')}
                      boxSize='90px'
                      objectFit='cover'
                      borderRadius='lg'
                    />}
                  </Td>
                  <Td>
                    <VStack alignItems='flex-start' spacing={1}>
                      <Text as='b'>{containerID}</Text>
                    </VStack>
                  </Td>
                  <Td>
                    <VStack alignItems='flex-start' spacing={1}>
                      <Text as='b'>{cookerID}</Text>
                    </VStack>
                  </Td>
                  <Td>
                    <VStack alignItems='flex-start' spacing={1}>
                      <Text as='b'>{formatDate(createdAt)}</Text>
                    </VStack>
                  </Td>
                  {/* <Td>
                    <div ref={qrRefs.current[containerAssignId]}>
                      <QRCode
                        value={JSON.stringify({
                          containerAssign_id: containerAssignId
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
                        {/* <Link to={`/containerAssigns/${id}`}>
                          <MenuItem>View</MenuItem>
                        </Link>
                        <MenuItem>
                          <UpdateContainerAssignModal id={id} />
                        </MenuItem> */}
                        <MenuItem onClick={() => handleDelete(_id)}>
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}
    </SimpleGrid>
  );
}

export default ContainerAssignsTable;
