import React, {useEffect, useState} from 'react';
import {
  SidebarWithHeader,
} from '../components';
import KitchensTable from '../components/KitchensTable'
import CreateNewKitchenModal from '../components/CreateNewKitchenModal';
import { HStack, VStack, Spinner, Heading, Button } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import { useKitchenContext } from '../context/kitchen_context';

function KitchensPage() {
  
  const {
    kitchens,
    kitchens_loading: loading,
    kitchens_error: error,
    fetchKitchens,
  } = useKitchenContext();

  const handleRefresh = async () => {
    await fetchKitchens();
  };

  if (loading) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
          <CreateNewKitchenModal />
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
          <CreateNewKitchenModal />
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
          <CreateNewKitchenModal />
          <Button
            colorScheme='brown'
            variant='outline'
            leftIcon={<MdOutlineRefresh />}
            onClick={handleRefresh}
          >
            Refresh
          </Button>
        </HStack>
        <KitchensTable kitchens={kitchens} />
      </SidebarWithHeader>
  );
}

export default KitchensPage;
