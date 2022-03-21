import React, { useEffect, useState } from "react";
import { Modal, Text, Button, HStack } from "native-base";

/**
 * @typedef {object} SelectionProp
 * @property {string} label
 * @property {()=>void} onPress?
 * @property {string} variant?
 * @property {boolean} closeOnPress?
 */

/**
 * @param {object} p
 * @param {SelectionProp} p.selectionProp
 * @param {()=>void} p.close
 */
const SelectionButton = (p) => {
  const variant = p.selectionProp.variant || "solid";
  const closeOnPress = p.selectionProp.closeOnPress || true;
  const handlePress = p.selectionProp.onPress || (() => {});
  const onPress = () => {
    handlePress();
    if (closeOnPress) p.close();
  };
  return (
    <Button variant={variant} onPress={onPress}>
      {p.selectionProp.label}
    </Button>
  );
};

/**
 * @param {object} p
 * @param {boolean} p.isOpen
 * @param {boolean} p.setIsOpen
 * @param {string} p.title
 * @param {string} p.message
 * @param {JSX.Element} p.children?
 * @param {SelectionProp[]}p.selections
 */
export default (p) => {
  const close = () => p.setIsOpen(false);
  const dom = (
    <Modal isOpen={p.isOpen}>
      <Modal.Content>
        <Modal.Header>{p.title}</Modal.Header>
        <Modal.Body>
          <Text>{p.message}</Text>
          {p.children && p.children}
        </Modal.Body>
        <Modal.Footer>
          <HStack space="xs">
            {p.selections.map((selectionProp, index) => (
              <SelectionButton
                key={index}
                selectionProp={selectionProp}
                close={close}
              />
            ))}
          </HStack>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
  return dom;
};
