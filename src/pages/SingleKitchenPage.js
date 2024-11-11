import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  SidebarWithHeader,
  ImagesList,
  // SingleKitchenInfo,
  // SingleKitchenReviews,
} from '../components';
import SingleKitchenInfo from '../components/SingleKitchenInfo'
import { useKitchenContext } from '../context/kitchen_context';
import { VStack, Heading, Spinner, Stack } from '@chakra-ui/react';

function SingleKitchenPage() {
  const { id } = useParams();
  const {
    single_kitchen_loading: loading,
    single_kitchen_error: error,
    single_kitchen: kitchen,
    fetchSingleKitchen,
  } = useKitchenContext();

  useEffect(() => {
    fetchSingleKitchen(id);
    // console.log(kitchen, "PRO...............")
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <SidebarWithHeader>
        <VStack alignItems='center' justifyContent='center'>
          <Spinner size='lg' color='brown.500' />
        </VStack>
      </SidebarWithHeader>
    );
  }

  if (error) {
    return (
      <SidebarWithHeader>
        <VStack alignItems='center' justifyContent='center'>
          <Heading color='red.500'>There was an error</Heading>
        </VStack>
      </SidebarWithHeader>
    );
  }

  // const { images, reviews = [] } = kitchen;
  return (
    <SidebarWithHeader>
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        spacing='8'
        alignItems='flex-start'
        bg='white'
        p='8'
        mb={4}
        borderRadius='lg'
        shadow='sm'
        overflowX='auto'
      >
        {/* <ImagesList images={images} /> */}
        <SingleKitchenInfo kitchen={kitchen} />
      </Stack>
      {/* {reviews.length > 0 && (
        <SingleKitchenReviews reviews={reviews} kitchenId={id} />
      )} */}
    </SidebarWithHeader>
  );
}

export default SingleKitchenPage;
