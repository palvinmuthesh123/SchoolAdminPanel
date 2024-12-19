import React from 'react';
import {
  ProductsTable,
  SidebarWithHeader,
} from '../components';
import PathwaysTable from '../components/PathwayTable';
import CreateNewPathwayModal from '../components/CreateNewPathwayModal';
import { HStack, VStack, Spinner, Heading, Button } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import { usePathwayContext } from '../context/pathway_context';

function PathwaysPage() {
  const {
    pathways,
    pathways_loading: loading,
    pathways_error: error,
    fetchPathways,
  } = usePathwayContext();

  const handleRefresh = async () => {
    await fetchPathways();
  };

  if (loading) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
          <CreateNewPathwayModal />
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
          <CreateNewPathwayModal />
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
        <CreateNewPathwayModal />
        <Button
          colorScheme='brown'
          variant='outline'
          leftIcon={<MdOutlineRefresh />}
          onClick={handleRefresh}
        >
          Refresh
        </Button>
      </HStack>
      <PathwaysTable pathways={pathways} />
    </SidebarWithHeader>
  );
}

export default PathwaysPage;
