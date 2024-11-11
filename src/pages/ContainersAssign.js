import React from 'react';
import {
  ProductsTable,
  SidebarWithHeader,
} from '../components';
import ContainerAssignsTable from '../components/ContainerAssignTable';
import CreateNewContainerAssignModal from '../components/CreateNewContainerAssignModal';
import { HStack, VStack, Spinner, Heading, Button } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import { useContainerAssignContext } from '../context/containerAssign_context';

function ContainerAssigns() {
  const {
    containerAssigns,
    containerAssigns_loading: loading,
    containerAssigns_error: error,
    fetchContainerAssigns,
  } = useContainerAssignContext();

  const handleRefresh = async () => {
    await fetchContainerAssigns();
  };

  if (loading) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
          {/* <CreateNewContainerAssignModal /> */}
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
          {/* <CreateNewContainerAssignModal /> */}
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
        {/* <CreateNewContainerAssignModal /> */}
        <Button
          colorScheme='brown'
          variant='outline'
          leftIcon={<MdOutlineRefresh />}
          onClick={handleRefresh}
        >
          Refresh
        </Button>
      </HStack>
      <ContainerAssignsTable containerAssigns={containerAssigns} />
    </SidebarWithHeader>
  );
}

export default ContainerAssigns;
