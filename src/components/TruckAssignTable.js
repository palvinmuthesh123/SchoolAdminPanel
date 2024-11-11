import React, { useState, useEffect, useRef } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { formatPrice } from '../utils/helpers';
import { useTruckAssignContext } from '../context/truckAssign_context';
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
import UpdateTruckAssignModal from './UpdateTruckAssignModal';
import QRCode from 'react-qr-code';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function TruckAssignsTable({ truckAssigns }) {
  const toast = useToast();
  const { fetchTruckAssigns, deleteTruckAssign } = useTruckAssignContext();
  const [loading, setLoading] = useState(false);
  const qrRefs = useRef({});

  const handleDownloadPDF = async (truckAssignId) => {
    const qrCanvas = qrRefs.current[truckAssignId]?.current;
  
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
        pdf.save(`${truckAssignId}_qr_code.pdf`);
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    }, 300); // Delay of 300ms
  };

  const handleDelete = async (id) => {
    console.log(id, "IIIIIIIIIIIIII")
    setLoading(true);
    const response = await deleteTruckAssign(id);
    setLoading(false);
    if (response.success) {
      toast({
        position: 'top',
        description: response.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      return await fetchTruckAssigns();
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
              <Th>Truck ID</Th>
              <Th>Container ID</Th>
              <Th>Assigned On</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {truckAssigns ? truckAssigns.map((truckAssign, index) => {
              const { image, TruckID, _id, containerID, createdAt } = truckAssign;
              if (!qrRefs.current[TruckID]) {
                qrRefs.current[TruckID] = React.createRef();
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
                      src={require('../assets/delivery.png')}
                      boxSize='100px'
                      objectFit='cover'
                      borderRadius='lg'
                    />}
                  </Td>
                  <Td>
                    <VStack alignItems='flex-start' spacing={1}>
                      <Text as='b'>{TruckID}</Text>
                    </VStack>
                  </Td>
                  <Td>
                    <VStack alignItems='flex-start' spacing={1}>
                      <Text as='b'>{containerID[0].replace(/[\[\]']/g, "").split(",").map(item => isNaN(item) ? `'${item.trim()}'` : parseInt(item.trim())).join(", ")}</Text>
                    </VStack>
                  </Td>
                  <Td>
                    <VStack alignItems='flex-start' spacing={1}>
                      <Text as='b'>{formatDate(createdAt)}</Text>
                    </VStack>
                  </Td>
                  {/* <Td>
                    <div ref={qrRefs.current[TruckID]}>
                      <QRCode
                        value={JSON.stringify({
                          // truckAssign_id: TruckID
                          truck_id: TruckID,
                          container_id: containerID
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
                        {/* <Link to={`/truckAssigns/${id}`}>
                          <MenuItem>View</MenuItem>
                        </Link>
                        <MenuItem>
                          <UpdateTruckAssignModal id={id} />
                        </MenuItem> */}
                        <MenuItem onClick={() => handleDelete(_id)}>
                          Delete
                        </MenuItem>
                        {/* <MenuItem onClick={() => handleDownloadPDF(TruckID)}>
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

export default TruckAssignsTable;
