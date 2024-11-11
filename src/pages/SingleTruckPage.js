import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  SidebarWithHeader,
  ImagesList,
  // SingleTruckInfo,
  // SingleTruckReviews,
} from '../components';
import SingleTruckInfo from '../components/SingleTruckInfo'
import { useTruckContext } from '../context/truck_context';
import { VStack, Heading, Spinner, Stack } from '@chakra-ui/react';

function SingleTruckPage() {
  const { id } = useParams();
  const {
    single_truck_loading: loading,
    single_truck_error: error,
    single_truck: truck,
    fetchSingleTruck,
  } = useTruckContext();

  useEffect(() => {
    fetchSingleTruck(id);
    // console.log(truck, "PRO...............")
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

  // const { images, reviews = [] } = truck;
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
        <SingleTruckInfo truck={truck} />
      </Stack>
      {/* {reviews.length > 0 && (
        <SingleTruckReviews reviews={reviews} truckId={id} />
      )} */}
    </SidebarWithHeader>
  );
}

export default SingleTruckPage;
