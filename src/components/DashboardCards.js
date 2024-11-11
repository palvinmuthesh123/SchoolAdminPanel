import React from 'react';
import { useOrderContext } from '../context/order_context';
import { FaShoppingCart, FaRupeeSign } from 'react-icons/fa';
import { MdPendingActions, MdDeliveryDining } from 'react-icons/md';
import { formatPrice } from '../utils/helpers';
import {
  Flex,
  Icon,
  Square,
  Spacer,
  Text,
  Heading,
  SimpleGrid,
  Box,
} from '@chakra-ui/react';
import { useContainerContext } from '../context/container_context';
import { useProductContext } from '../context/product_context';
import { useTruckContext } from '../context/truck_context';
import { useSchoolContext } from '../context/school_context';
import { useKitchenContext } from '../context/kitchen_context';

function DashboardCards() {
  const { orders, pending_orders, delivered_orders, total_revenue } = useOrderContext();
  const { containers } = useContainerContext();
  const { products } = useProductContext();
  const { trucks } = useTruckContext();
  const { schools } = useSchoolContext();
  const { kitchens } = useKitchenContext();
  const cardList = [
    {
      title: 'Total Orders',
      value: orders.length,
      icon: FaShoppingCart,
      color: 'brown.500',
    },
    {
      title: 'Total Cookers',
      value: products ? products.length : 0,
      icon: MdPendingActions,
      color: 'red.500',
    },
    {
      title: 'Total Containers',
      value: containers ? containers.length : 0,
      icon: MdDeliveryDining,
      color: 'blue.500',
    },
    {
      title: 'Total Trucks',
      value: trucks ? trucks.length : 0,
      icon: FaRupeeSign,
      color: 'green.500',
    },
    {
      title: 'Total Kitchens',
      value: kitchens ? kitchens.length : 0,
      icon: MdDeliveryDining,
      color: 'blue.500',
    },
    {
      title: 'Total Schools',
      value: schools ? schools.length : 0,
      icon: FaRupeeSign,
      color: 'green.500',
    }
  ];

  return (
    <SimpleGrid minChildWidth='250px' spacing={5} mb={5}>
      {cardList.map((card, index) => {
        const { title, value, icon, color } = card;
        return (
          <Flex
            key={index}
            shadow='lg'
            bg='white'
            p='5'
            borderRadius='lg'
            justifyContent='center'
          >
            <Box>
              <Text fontSize='1xl' color='gray.500'>
                {title}
              </Text>
              <Heading size='lg' color={color}>
                {value}
              </Heading>
            </Box>
            <Spacer />
            <Square size='60px' bg='brown.400' borderRadius='lg'>
              <Icon as={icon} color='white' />
            </Square>
          </Flex>
        );
      })}
    </SimpleGrid>
  );
}

export default DashboardCards;
