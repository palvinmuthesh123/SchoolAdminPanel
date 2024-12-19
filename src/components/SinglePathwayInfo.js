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
import { usePathwayContext } from '../context/pathway_context';
import { Stars } from '.';
import { useOrderContext } from '../context/order_context';

function SinglePathwayInfo({ pathway }) {
  const { admins } = useAdminContext();
  const { orders } = useOrderContext();
  const { single_pathway_loading: loading } = usePathwayContext();
  const [createdBy, setCreatedBy] = useState('');
  const [unitSold, setUnitSold] = useState(0);
  const {
    _id: id = '',
    name = '',
    description = '',
    schools = '',
    kitchenId = '',
    admin = '',
    createdAt,
  } = pathway;

  useEffect(() => {
    console.log(pathway, "{PPPPPPPPPPPPPPPPP}")
    // finding the admin from ID
    const createdBy = admins.find((x) => x.id === admin);
    if (createdBy) {
      setCreatedBy(createdBy.name);
    } else {
      setCreatedBy('No Details');
    }

    // creating new array having this pathway as the only orderItem
    // const pathwayOrders = orders.reduce((arr, order) => {
    //   const item = order.orderItems.find((x) => x.pathway === id);
    //   if (item) {
    //     arr.push(item);
    //   }
    //   return arr;
    // }, []);

    // // calculating total units sold
    // const total = pathwayOrders.reduce((total, order) => {
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
            <Td>Route Name</Td>
            <Td>{name}</Td>
          </Tr>
          {/* <Tr>
            <Td>Price</Td>
            <Td>{formatPrice(price)}</Td>
          </Tr> */}
          <Tr>
            <Td>Description</Td>
            <Td>{description}</Td>
          </Tr>
          <Tr>
            <Td>Schools</Td>
            <Td>{Array.isArray(schools) ? schools.join(", ") : "NA"}</Td>
          </Tr>

          <Tr>
            <Td>Kitchen ID</Td>
            <Td>{kitchenId}</Td>
          </Tr>
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

export default SinglePathwayInfo;
