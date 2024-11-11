import React from 'react';
import {
  ProductsTable,
  SidebarWithHeader,
} from '../components';
import TrucksTable from '../components/TruckTable'
import CreateNewTruckModal from '../components/CreateNewTruckModal';
import { HStack, VStack, Spinner, Heading, Button } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import { useTruckContext } from '../context/truck_context';

function TrucksPage() {
  const {
    trucks,
    trucks_loading: loading,
    trucks_error: error,
    fetchTrucks,
  } = useTruckContext();

  const handleRefresh = async () => {
    await fetchTrucks();
  };

  React.useEffect(()=>{
    console.log(trucks, "TT")
  },[])

  if (loading) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
          <CreateNewTruckModal />
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
          <CreateNewTruckModal />
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
        <CreateNewTruckModal />
        <Button
          colorScheme='brown'
          variant='outline'
          leftIcon={<MdOutlineRefresh />}
          onClick={handleRefresh}
        >
          Refresh
        </Button>
      </HStack>
      <TrucksTable trucks={trucks} />
    </SidebarWithHeader>
  );
}

export default TrucksPage;
