import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  SidebarWithHeader,
  ImagesList,
  // SingleSchoolInfo,
  // SingleSchoolReviews,
} from '../components';
import SingleSchoolInfo from '../components/SingleSchoolInfo'
import { useSchoolContext } from '../context/school_context';
import { VStack, Heading, Spinner, Stack } from '@chakra-ui/react';

function SingleSchoolPage() {
  const { id } = useParams();
  const {
    single_school_loading: loading,
    single_school_error: error,
    single_school: school,
    fetchSingleSchool,
  } = useSchoolContext();

  useEffect(() => {
    fetchSingleSchool(id);
    // console.log(school, "PRO...............")
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

  // const { images, reviews = [] } = school;
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
        <SingleSchoolInfo school={school} />
      </Stack>
      {/* {reviews.length > 0 && (
        <SingleSchoolReviews reviews={reviews} schoolId={id} />
      )} */}
    </SidebarWithHeader>
  );
}

export default SingleSchoolPage;
