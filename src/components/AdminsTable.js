import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  SimpleGrid,
  Spinner,
  useToast,
  HStack,
  Checkbox,
} from '@chakra-ui/react';
import { useAdminContext } from '../context/admin_context';

function AdminsTable({ admins }) {
  const toast = useToast();
  const { updateAdminPrivilege, deleteAdmin, fetchAdmins } = useAdminContext();
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});

  // Initialize selectedItems with admin data only once when admins are loaded
  useEffect(() => {
    if (admins && Object.keys(selectedItems).length === 0) {
      const initialState = admins.reduce((acc, admin) => {
        acc[admin.id] = {
          cookers: admin.cooker || false,
          containers: admin.container || false,
          trucks: admin.truck || false,
          schools: admin.school || false,
          kitchens: admin.kitchen || false,
        };
        return acc;
      }, {});
      setSelectedItems(initialState);
    }
  }, [admins]);

  // Toggle checkbox state for an individual admin and call updateAdminPrivilege
  const handleCheckboxChange = async (adminId, checkboxName) => {
    setLoading(true);

    // Update local state first
    setSelectedItems((prevState) => ({
      ...prevState,
      [adminId]: {
        ...prevState[adminId],
        [checkboxName]: !prevState[adminId][checkboxName],
      },
    }));

    // Send the updated privileges to the server
    const privileges = {
      ...selectedItems[adminId],
      [checkboxName]: !selectedItems[adminId][checkboxName], // toggle the updated checkbox state
    };

    console.log(privileges, "PPPPPPPPPPPPPPP")
    
    const response = await updateAdminPrivilege(adminId, privileges);

    setLoading(false);

    if (response.success) {
      toast({
        position: 'top',
        description: `${response.data.name}'s privileges updated successfully`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      await fetchAdmins(); // Re-fetch admins after update
    } else {
      toast({
        position: 'top',
        description: response.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    const response = await deleteAdmin(id);
    setLoading(false);
    if (response.success) {
      toast({
        position: 'top',
        description: response.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      await fetchAdmins(); // Re-fetch admins after delete
    } else {
      toast({
        position: 'top',
        description: response.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <SimpleGrid bg="white" p={5} shadow="lg" borderRadius="lg" overflowX="auto">
      {loading ? (
        <HStack my={8} alignItems="center" justifyContent="center">
          <Spinner size="lg" color="brown.500" />
        </HStack>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Privileges</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {admins.map((admin) => {
              const { name, email, id: adminId } = admin;
              const adminPrivileges = selectedItems[adminId] || {};

              return (
                <Tr key={adminId}>
                  <Td>{name}</Td>
                  <Td>{email}</Td>
                  <Td>
                    {['cookers', 'containers', 'trucks', 'schools', 'kitchens'].map((privilege) => (
                      <><Checkbox
                        key={privilege}
                        name={privilege}
                        isChecked={adminPrivileges[privilege] || false}
                        onChange={() => handleCheckboxChange(adminId, privilege)}
                      >
                        {privilege.charAt(0).toUpperCase() + privilege.slice(1)}
                      </Checkbox><br/></>
                    ))}
                  </Td>
                  <Td>
                    <Button ml={2} colorScheme="red" onClick={() => handleDelete(adminId)}>
                      Delete
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}
    </SimpleGrid>
  );
}

export default AdminsTable;
