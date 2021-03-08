import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";

import TodoItem from "./TodoItem";
import { server } from "../../config/server";
import { Button, Input, Flex } from "@chakra-ui/react";

export default function TodoList(){
    const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  function fetchItems() {
    axios
      .get(`${server}/api/items/`)
      .then((result) => {
        setItems(result.data);
      })
      .catch((err) => {
        console.log(`Something went wrong getting items: ${err}`);
      });
  }

  function onNewitemChange(e) {
    setNewItem(e.target.value);
  }

  function onMarkTodo(e) {
    const backupItems =[...items];
    setItems(
      items.map((item) => {
        if (item._id === e._id) {
          item.done = !item.done;
        }
        return item;
      })
    );
    axios
      .put(`${server}/api/items/${e._id}`, {
        done: !e.done,
      })
      .then((result) => {
        console.log("Item updated");
      })
      .catch((err) => {
        setItems(backupItems);
        console.log(`Something went wrong updating item ${err}`);
      });
  }

  function onDeleteDoneItems() {
    const backupItems = items;

    setItems(items.filter((e) => !e.done));
    axios
      .delete(`${server}/api/items/`)
      .then((result) => {
        console.log("Deleted some items!");
      })
      .catch((err) => {
        setItems(backupItems);
        console.log(`Something went wrong deleting items ${err}`);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const item = {
      title: newItem,
      done: false,
    };
    axios
      .post(`${server}/api/items/`, item)
      .then((result) => {
        setNewItem("");
        fetchItems();
      })
      .catch((err) => {
        console.log(`Something went wrong submitting new item ${err}`);
      });
  }

  const displayItems = items.map((e) => (
    <TodoItem key={e._id} onMarkTodo={onMarkTodo} {...e} />
  ));

  return (
    <Flex flexDirection="column" width="500px" alignItems="center" bg="blue.700" shadow="lg" py={2} rounded="lg">
      <Flex flexDirection="column" alignItems="flex-start">
        {displayItems}
      </Flex>
      <Flex
        flexDirection="column"
        justifyContent="space-around"
        flexWrap="wrap"
        alignItems="center"
        alignContent="center"
      >
        <Flex py="1">
          <form onSubmit={handleSubmit}>
            <Input
              marginRight="1"
              width="300px"
              onChange={onNewitemChange}
              value={newItem}
              placeholder="What to do..."
            />
            <Button onClick={handleSubmit} colorScheme="green">
              Add Task
            </Button>
          </form>
        </Flex>
        <Button
          type="submit"
          onClick={onDeleteDoneItems}
          colorScheme="red"
          variant="outline"
        >
          Remove Finished Tasks
        </Button>
      </Flex>
    </Flex>
  );
}