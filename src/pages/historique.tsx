import { Box, Button, Switch, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { log } from "console";
import { useEffect, useState } from "react";
import Simple from "~/components/navbar";

interface Tag {
  id: number;
  topic: string;
  lastseen: string;
  value: string;
}

export default function Home(props) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [enabledTags, setEnabledTags] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const intervalId = setInterval(() => {
      getAllTags();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function getAllTags() {
    fetch("/api/getAllTags", {
      method: "POST",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erreur HTTP! Statut: ${res.status}`);
        }
        return res.json();
      })
      .then((tagsData: Tag[]) => {
        setTags(tagsData);
      })
      .catch((err) => {
        console.error(err);
      });
  }



  return (
    <><Simple />
      <Box as="main" minH={"calc(100vh - 8rem)"}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Topic</Th>
              <Th>Lastseen</Th>
              <Th isNumeric>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tags.map((tag) => (
              <Tr key={tag.id}>
                <Td>{tag.id}</Td>
                <Td>{tag.topic}</Td>
                <Td>{tag.lastseen}</Td>
                <Td isNumeric>{tag.value}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );


}
