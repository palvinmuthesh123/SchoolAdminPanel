import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  SidebarWithHeader,
  ImagesList,
  // SinglePathwayInfo,
  // SinglePathwayReviews,
} from '../components';
import SinglePathwayInfo from '../components/SinglePathwayInfo'
import { usePathwayContext } from '../context/pathway_context';
import { VStack, Heading, Spinner, Stack } from '@chakra-ui/react';

function SinglePathwayPage() {
  const { id } = useParams();
  const {
    single_pathway_loading: loading,
    single_pathway_error: error,
    single_pathway: pathway,
    fetchSinglePathway,
  } = usePathwayContext();

  useEffect(() => {
    fetchSinglePathway(id);
    // console.log(pathway, "PRO...............")
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

  // const { images, reviews = [] } = pathway;
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
        <SinglePathwayInfo pathway={pathway} />
      </Stack>
      {/* {reviews.length > 0 && (
        <SinglePathwayReviews reviews={reviews} pathwayId={id} />
      )} */}
    </SidebarWithHeader>
  );
}

export default SinglePathwayPage;
