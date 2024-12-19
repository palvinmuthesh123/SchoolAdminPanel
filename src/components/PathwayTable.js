import React, { useState, useEffect, useRef } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { formatPrice } from '../utils/helpers';
import { usePathwayContext } from '../context/pathway_context';
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
import UpdatePathwayModal from './UpdatePathwayModal';
import QRCode from 'react-qr-code';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function PathwaysTable({ pathways }) {
  const toast = useToast();
  const { fetchPathways, deletePathway } = usePathwayContext();
  const [loading, setLoading] = useState(false);
  const qrRefs = useRef({});

  const handleDownloadPDF = async (pathwayId) => {
    const qrCanvas = qrRefs.current[pathwayId]?.current;
  
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
        pdf.save(`${pathwayId}_qr_code.pdf`);
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    }, 300); // Delay of 300ms
  };

  const handleDelete = async (id) => {
    setLoading(true);
    const response = await deletePathway(id);
    setLoading(false);
    if (response.success) {
      toast({
        position: 'top',
        description: response.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      return await fetchPathways();
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
              <Th>Pathway Name</Th>
              <Th>Description</Th>
              <Th>Schools</Th>
              <Th>Kitchen</Th>
              {/* <Th>QR</Th> */}
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {pathways.map((pathway, index) => {
              const { image, name, id, description, schools, kitchenId } = pathway;
              if (!qrRefs.current[name]) {
                qrRefs.current[name] = React.createRef();
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
                      src={require('../assets/pathways.png')}
                      boxSize='90px'
                      objectFit='cover'
                      borderRadius='lg'
                    />}
                  </Td>
                  <Td>
                    <VStack alignItems='flex-start' spacing={1}>
                      <Text as='b'>{name}</Text>
                    </VStack>
                  </Td>
                  <Td>
                    <VStack alignItems='flex-start' spacing={1}>
                      <Text as='b'>{description}</Text>
                    </VStack>
                  </Td>
                  <Td>
                    <VStack alignItems="flex-start" spacing={1}>
                      <Text as="b">{Array.isArray(schools) ? schools.join(", ") : ""}</Text>
                    </VStack>
                  </Td>
                  <Td>
                    <VStack alignItems='flex-start' spacing={1}>
                      <Text as='b'>{kitchenId}</Text>
                    </VStack>
                  </Td>
                  {/* <Td>
                    <div ref={qrRefs.current[name]}>
                      <QRCode
                        value={JSON.stringify({
                          pathway_name: name
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
                        <Link to={`/pathways/${id}`}>
                          <MenuItem>View</MenuItem>
                        </Link>
                        <MenuItem>
                          <UpdatePathwayModal id={id} />
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

export default PathwaysTable;
