import React, { useState, useEffect } from 'react';
import {
  HStack,
  VStack,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  Box,
  Tag,
} from '@chakra-ui/react';
import { formatPrice } from '../utils/helpers';
import { useAdminContext } from '../context/admin_context';
import { useTruckContext } from '../context/truck_context';
import { Stars } from '.';
import { useOrderContext } from '../context/order_context';

function SingleTruckInfo({ truck }) {
  const { admins } = useAdminContext();
  const { orders } = useOrderContext();
  const { single_truck_loading: loading } = useTruckContext();
  const [createdBy, setCreatedBy] = useState('');
  const [unitSold, setUnitSold] = useState(0);
  const {
    _id: id = '',
    truckId = '',
    description = '',
    kitchenId = '',
    admin = '',
    createdAt,
  } = truck;

  useEffect(() => {
    console.log(truck, "{PPPPPPPPPPPPPPPPP}")
    // finding the admin from ID
    const createdBy = admins.find((x) => x.id === admin);
    if (createdBy) {
      setCreatedBy(createdBy.name);
    } else {
      setCreatedBy('No Details');
    }

    // creating new array having this truck as the only orderItem
    // const truckOrders = orders.reduce((arr, order) => {
    //   const item = order.orderItems.find((x) => x.truck === id);
    //   if (item) {
    //     arr.push(item);
    //   }
    //   return arr;
    // }, []);

    // // calculating total units sold
    // const total = truckOrders.reduce((total, order) => {
    //   const { quantity } = order;
    //   total += quantity;
    //   return total;
    // }, 0);

    // setUnitSold(total);
    // eslint-disable-next-line
  }, [loading]);

  return (
    <VStack>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Truck ID</Td>
            <Td>{truckId}</Td>
          </Tr>
          <Tr>
            <Td>Kitchen ID</Td>
            <Td>{kitchenId}</Td>
          </Tr>
          <Tr>
            <Td>Description</Td>
            <Td>{description}</Td>
          </Tr>
          {/* <Tr>
            <Td>Stock</Td>
            <Td>{stock}</Td>
          </Tr>
          <Tr>
            <Td>Units sold</Td>
            <Td>{unitSold}</Td>
          </Tr>
          <Tr>
            <Td>Rating</Td>
            <Td>
              <Stars stars={rating} />
            </Td>
          </Tr>
          <Tr>
            <Td>Reviews</Td>
            <Td>{numberOfReviews} customer reviews</Td>
          </Tr>
          <Tr>
            <Td>Colors</Td>
            <Td>
              <HStack>
                {colors.map((color, index) => {
                  return <Box key={index} bg={color} p='2' borderRadius='5' />;
                })}
              </HStack>
            </Td>
          </Tr>
          <Tr>
            <Td>Sizes</Td>
            <Td>
              <HStack>
                {sizes.map((size, index) => {
                  return (
                    <Tag
                      key={index}
                      variant='outline'
                      textTransform='uppercase'
                    >
                      {size}
                    </Tag>
                  );
                })}
              </HStack>
            </Td>
          </Tr>
          <Tr>
            <Td>Company</Td>
            <Td>{company}</Td>
          </Tr>
          <Tr>
            <Td>Category</Td>
            <Td>{category}</Td>
          </Tr>
          <Tr>
            <Td>Shipping</Td>
            <Td>{shipping ? formatPrice(55000) : formatPrice(0)}</Td>
          </Tr>
          <Tr>
            <Td>Featured</Td>
            <Td>{featured ? 'Yes' : 'No'}</Td>
          </Tr> */}
          <Tr>
            <Td>Created by</Td>
            <Td>{createdBy}</Td>
          </Tr>
          <Tr>
            <Td>Created at</Td>
            <Td>
              {new Date(createdAt).toDateString()},{' '}
              {new Date(createdAt).toLocaleTimeString('en-IN')}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </VStack>
  );
}

export default SingleTruckInfo;
