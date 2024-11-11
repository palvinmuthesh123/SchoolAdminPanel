import React from 'react';
import {
  ProductsTable,
  SidebarWithHeader,
} from '../components';
import TruckAssignsTable from '../components/TruckAssignTable'
import CreateNewTruckAssignModal from '../components/CreateNewTruckAssignModal';
import { HStack, VStack, Spinner, Heading, Button } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import { useTruckAssignContext } from '../context/truckAssign_context';

function TruckAssignsAssign() {
  const {
    truckAssigns,
    truckAssigns_loading: loading,
    truckAssigns_error: error,
    fetchTruckAssigns,
  } = useTruckAssignContext();

  const handleRefresh = async () => {
    await fetchTruckAssigns();
  };

  if (loading) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
          {/* <CreateNewTruckAssignModal /> */}
          <Button
            colorScheme='brown'
            variant='outline'
            leftIcon={<MdOutlineRefresh />}
            onClick={handleRefresh}
          >
            Refresh
          </Button>
        </HStack>
        <VStack alignItems='center' justifyContent='center'>
          <Spinner size='lg' color='brown.500' />
        </VStack>
      </SidebarWithHeader>
    );
  }

  if (error) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
          {/* <CreateNewTruckAssignModal /> */}
          <Button
            colorScheme='brown'
            variant='outline'
            leftIcon={<MdOutlineRefresh />}
            onClick={handleRefresh}
          >
            Refresh
          </Button>
        </HStack>
        <VStack alignItems='center' justifyContent='center'>
          <Heading color='red.500'>There was an error</Heading>
        </VStack>
      </SidebarWithHeader>
    );
  }

  return (
    <SidebarWithHeader>
      <HStack mb={5}>
        {/* <CreateNewTruckAssignModal /> */}
        <Button
          colorScheme='brown'
          variant='outline'
          leftIcon={<MdOutlineRefresh />}
          onClick={handleRefresh}
        >
          Refresh
        </Button>
      </HStack>
      <TruckAssignsTable truckAssigns={truckAssigns} />
    </SidebarWithHeader>
  );
}

export default TruckAssignsAssign;
