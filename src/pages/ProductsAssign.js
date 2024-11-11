import React from 'react';
import {
  // ProductAssignsTable,
  SidebarWithHeader,
  // CreateNewProductAssignModal,
} from '../components';
import CreateNewProductAssignModal from '../components/CreateNewProductAssignModal';
import ProductAssignsTable from '../components/ProductAssignsTable'
import { HStack, VStack, Spinner, Heading, Button } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import { useProductAssignContext } from '../context/productAssign_context';

function CookerAssign() {
  const {
    productAssigns,
    productAssigns_loading: loading,
    productAssigns_error: error,
    fetchProductAssigns,
  } = useProductAssignContext();

  const handleRefresh = async () => {
    await fetchProductAssigns();
  };

  

  if (loading) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
          {/* <CreateNewProductAssignModal /> */}
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
          {/* <CreateNewProductAssignModal /> */}
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
        {/* <CreateNewProductAssignModal /> */}
        <Button
          colorScheme='brown'
          variant='outline'
          leftIcon={<MdOutlineRefresh />}
          onClick={handleRefresh}
        >
          Refresh
        </Button>
      </HStack>
      <ProductAssignsTable productAssigns={productAssigns} />
    </SidebarWithHeader>
  );
}

export default CookerAssign;
