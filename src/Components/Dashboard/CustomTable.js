import React from "react";
import { useTable, usePagination } from "react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  IconButton,
  Text,
  Tooltip,
  Image,
  useColorModeValue,
  Heading
} from "@chakra-ui/react";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon
} from "@chakra-ui/icons";
import image from '../../assets/images/Dashboard/datanotfound.png'
import CustomLoading from "./CustomLoading";



function CustomTable({ columns, data, isLoading}) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }
    },
    usePagination
  );

  const weight = useColorModeValue('600','unset')
  const bg = useColorModeValue('gray.100', 'gray.700')

  // Render the UI for your table
  return (
    <>
      <Table overflowX={'hidden'} {...getTableProps()} minH={ data.length === 0 && '350px'}>
        <Thead overflowX={'hidden'}>
          { page.length !== 0 && headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()} fontFamily={'Poppins'} fontWeight={600}>{column.render("Header")}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.length === 0 ? 
          <Tr>
            <Td colSpan={12} alignContent={'center'} >
              <Flex width={'100%'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                { isLoading ? <CustomLoading /> : <><Image src={image} maxW={{base: '8em', md: '10em'}} opacity={0.9} /> <Text mt={3} textAlign={'center'} fontSize={'md'} color={'gray.500'}>Aucune données <br /> disponibles</Text></>}

              </Flex>
            </Td>
          </Tr> : 
          page.map((row, i) => {
            prepareRow(row);
            return (
              <Tr _hover={{ bg: bg}}  {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td  {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      <Flex justifyContent="space-between" w={'full'} m={4} alignItems="center">
        <Flex>
          <Tooltip label="First Page">
            <IconButton
              onClick={() => gotoPage(0)}
              isDisabled={!canPreviousPage}
              icon={<ArrowLeftIcon h={3} w={3} />}
              mr={4}
            />
          </Tooltip>
          <Tooltip label="Previous Page">
            <IconButton
              onClick={previousPage}
              isDisabled={!canPreviousPage}
              icon={<ChevronLeftIcon h={6} w={6} />}
            />
          </Tooltip>
        </Flex>

        <Flex alignItems="center">
          <Text fontSize={{base: 'sm', md: 'md'}} flexShrink="0" mr={8}>
            Page{" "}
            <Text fontSize={{base: 'sm', md: 'md'}} fontWeight="bold" as="span">
              {pageIndex + 1}
            </Text>{" "}
            of{" "}
            <Text fontSize={{base: 'sm', md: 'md'}} fontWeight="bold" as="span">
              {pageOptions.length}
            </Text>
          </Text>
          {/* <Text flexShrink="0">Go to page:</Text>{" "}
          <NumberInput
            ml={2}
            mr={8}
            w={28}
            min={1}
            max={pageOptions.length}
            onChange={(value) => {
              const page = value ? value - 1 : 0;
              gotoPage(page);
            }}
            defaultValue={pageIndex + 1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput> */}
          {/* <Select
            w={32}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Liste {pageSize}
              </option>
            ))}
          </Select> */}
        </Flex>

        <Flex>
          <Tooltip label="Next Page">
            <IconButton
              fontSize={{base: 'sm', md: 'md'}}
              onClick={nextPage}
              isDisabled={!canNextPage}
              icon={<ChevronRightIcon h={6} w={6} />}
            />
          </Tooltip>
          <Tooltip label="Last Page">
            <IconButton
              fontSize={{base: 'sm', md: 'md'}}
              onClick={() => gotoPage(pageCount - 1)}
              isDisabled={!canNextPage}
              icon={<ArrowRightIcon h={3} w={3} />}
              ml={4}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </>
  );
}

// function App() {
  

//   //const data = React.useMemo(() => makeData(100000), []);


// }

export default CustomTable;