import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/user_context';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Menu, MenuButton, MenuList, MenuItem, SimpleGrid, HStack, Spinner, useToast, Text, VStack } from '@chakra-ui/react';
import { useOrderContext } from '../context/order_context';

function OrdersTable({ orders }) {
  const toast = useToast();
  const { currentUser } = useUserContext();
  const { fetchOrders, deleteOrder } = useOrderContext();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    setLoading(true);
    const response = await deleteOrder(id);
    setLoading(false);
    if (response.success) {
      toast({
        position: 'top',
        description: response.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      return await fetchOrders();
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


  // const getCookerDetails = (order) => {
  //   const cookerMap = new Map();

  //   order.cooker.forEach((cookerItem) => {
  //     const { cookerID, containerID, cookerDetails } = cookerItem;

  //     if (cookerMap.has(cookerID)) {
  //       // Add to existing cookerID's containers
  //       cookerMap.get(cookerID).add(containerID);
  //     } else {
  //       // Initialize a new set of containers for a new cookerID
  //       cookerMap.set(cookerID, new Set([containerID]));
  //     }
  //   });

  //   // Transform the map into a readable array format
  //   return Array.from(cookerMap.entries()).map(([cookerID, containers]) => ({
  //     cookerID,
  //     containers: Array.from(containers).join(', '),
  //   }));
  // };

  const getCookerDetails = (order) => {
    const cookerMap = new Map();
    order.cooker.forEach((cookerItem) => {
      const { cookerID, containerID, cookerDetails } = cookerItem;
      if (cookerMap.has(cookerID)) {
        cookerMap.get(cookerID).containers.add(containerID);
      } else {
        cookerMap.set(cookerID, {
          cookerDetails: cookerDetails,
          containers: new Set([containerID]),
        });
      }
    });
    return Array.from(cookerMap.entries()).map(([cookerID, { containers, cookerDetails }]) => ({
      cookerID,
      cookerDetails,
      containers: Array.from(containers).join(', '),
    }));
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
              <Th>School Details</Th>
              <Th>Truck Details</Th>
              <Th>Cooker Details</Th>
              <Th>Driver Details</Th>
              <Th>Status</Th>
              <Th>Date</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order, index) => {
              const { school, cooker, truck, _id: id, createdAt, driver, status } = order;
              const cookerDetails = getCookerDetails(order);
              return (
                <Tr key={index}>
                  <Td><strong>Name: </strong>{school?.name}<br /><strong>Ph no: </strong>{school?.description}</Td>
                  <Td><strong>Truck ID: </strong>{truck?.truckId}<br /><strong>No: </strong>{truck?.description}</Td>
                  <Td>
                    {cookerDetails.map((group, i) => (
                      <Text style={{marginBottom: '10px'}} key={i}>
                        <strong>Cooker ID: </strong>{group.cookerID + " ( " + group.cookerDetails.description + " ) "},
                        <br /><strong>Containers: </strong>{group.containers}
                      </Text>
                    ))}
                  </Td>
                  <Td>
                    <strong>Name: </strong>{driver?.name?.charAt(0).toUpperCase() + driver?.name?.slice(1)}<br />
                    <strong>Email: </strong>{driver?.email}
                  </Td>
                  <Td>{status}</Td>
                  <Td><Text>{formatDate(createdAt)}</Text></Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}
    </SimpleGrid>
  );
}

export default OrdersTable;