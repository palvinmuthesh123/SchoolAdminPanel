import React, { useState, useEffect, useRef } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { formatPrice } from '../utils/helpers';
import { useContainerContext } from '../context/container_context';
import { useKitchenContext } from '../context/kitchen_context';
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
import UpdateContainerModal from './UpdateContainerModal';
import QRCode from 'react-qr-code';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Multiselect from 'multiselect-react-dropdown';

function ContainersTable({ containers }) {
  const toast = useToast();
  const { fetchContainers, deleteContainer } = useContainerContext();
  const [loading, setLoading] = useState(false);
  const qrRefs = useRef({});
  const { kitchens } = useKitchenContext();

  const handleDownloadPDF = async (containerId) => {
    const qrCanvas = qrRefs.current[containerId]?.current;
  
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
        pdf.save(`${containerId}_qr_code.pdf`);
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    }, 300); // Delay of 300ms
  };

  const handleDelete = async (id) => {
    setLoading(true);
    const response = await deleteContainer(id);
    setLoading(false);
    if (response.success) {
      toast({
        position: 'top',
        description: response.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      return await fetchContainers();
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
              <Th>Container ID</Th>
              <Th>Description</Th>
              <Th>Kitchen</Th>
              <Th>QR</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {containers.map((container, index) => {
              const { image, containerId, id, description, kitchenId } = container;
              if (!qrRefs.current[containerId]) {
                qrRefs.current[containerId] = React.createRef();
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
                      <Text as='b'>{containerId}</Text>
                    </VStack>
                  </Td>
                  <Td>
                    <VStack alignItems='flex-start' spacing={1}>
                      <Text as='b'>{description}</Text>
                    </VStack>
                  </Td>
                  <Td>
                    <VStack alignItems="flex-start" spacing={1}>
                    <Text as='b'>{kitchenId}</Text>
                    </VStack>
                  </Td>
                  <Td>
                    <div ref={qrRefs.current[containerId]}>
                      <QRCode
                        value={JSON.stringify({
                          container_id: containerId
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
                        <Link to={`/containers/${id}`}>
                          <MenuItem>View</MenuItem>
                        </Link>
                        <MenuItem>
                          <UpdateContainerModal id={id} />
                        </MenuItem>
                        <MenuItem onClick={() => handleDelete(id)}>
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

export default ContainersTable;
