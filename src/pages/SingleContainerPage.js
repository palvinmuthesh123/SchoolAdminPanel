import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  SidebarWithHeader,
  ImagesList,
  // SingleContainerInfo,
  // SingleContainerReviews,
} from '../components';
import SingleContainerInfo from '../components/SingleContainerInfo'
import { useContainerContext } from '../context/container_context';
import { VStack, Heading, Spinner, Stack } from '@chakra-ui/react';

function SingleContainerPage() {
  const { id } = useParams();
  const {
    single_container_loading: loading,
    single_container_error: error,
    single_container: container,
    fetchSingleContainer,
  } = useContainerContext();

  useEffect(() => {
    fetchSingleContainer(id);
    // console.log(container, "PRO...............")
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

  // const { images, reviews = [] } = container;
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
        <SingleContainerInfo container={container} />
      </Stack>
      {/* {reviews.length > 0 && (
        <SingleContainerReviews reviews={reviews} containerId={id} />
      )} */}
    </SidebarWithHeader>
  );
}

export default SingleContainerPage;
