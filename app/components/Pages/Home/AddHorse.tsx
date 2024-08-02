import React, { useState, useEffect } from "react";
import Input from "../../Inputs/Input";
import Button from "../../Buttons/Button";
import Modal from "../../Modals/Modal";
import {
  TrashIcon,
  PencilIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

interface Horse {
  name: string;
  breed: string;
  gender: string;
  age: string;
  height: string;
}

interface AddHorseProps {
  onAddHorse: (horses: Horse[]) => void;
  horses: Horse[]; // Added this prop
}

const AddHorse: React.FC<AddHorseProps> = ({ onAddHorse, horses: initialHorses }) => {
  const [horses, setHorses] = useState<Horse[]>(initialHorses);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [horseData, setHorseData] = useState<Horse>({
    name: "",
    breed: "",
    gender: "",
    age: "",
    height: "",
  });

  const initialHorseData = {
    name: "",
    breed: "",
    gender: "",
    age: "",
    height: "",
  };

  useEffect(() => {
    setHorses(initialHorses);
  }, [initialHorses]);

  const handleInputChange = (field: string, value: string) => {
    setHorseData({ ...horseData, [field]: value });
  };

  const handleAddHorse = () => {
    if (editIndex !== null) {
      const updatedHorses = horses.map((horse, index) =>
        index === editIndex ? horseData : horse
      );
      setHorses(updatedHorses);
      onAddHorse(updatedHorses);
      setEditIndex(null);
    } else {
      const updatedHorses = [...horses, horseData];
      setHorses(updatedHorses);
      onAddHorse(updatedHorses);
    }
    setHorseData(initialHorseData);
    setShowModal(false);
  };

  const handleEditHorse = (index: number) => {
    const editedHorse = horses[index];
    setHorseData(editedHorse);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDeleteHorse = (index: number) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const confirmDeleteHorse = () => {
    if (deleteIndex !== null) {
      const updatedHorses = horses.filter((_, i) => i !== deleteIndex);
      setHorses(updatedHorses);
      onAddHorse(updatedHorses);
      setDeleteIndex(null);
      setShowDeleteModal(false);
    }
  };

  const handleAddAnotherHorse = () => {
    setHorseData(initialHorseData);
    setEditIndex(null);
    setShowModal(true);
  };

  return (
    <div className="p-4 bg-white border border-stone-200 rounded-lg">
      {horses.length === 0 && !showModal && (
        <div className="text-center flex flex-col gap-2">
          <div className="flex flex-col gap-4">
            <img
              src="/assets/running-horses.avif"
              className="w-96 opacity-50 mx-auto"
            />
            <p className="text-stone-600">
              Add your horses that need transportation.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-1/2">
              <Button
                primary
                className="mt-2 text-sm"
                icon={PlusCircleIcon}
                onClick={handleAddAnotherHorse}
              >
                Add a horse
              </Button>
            </div>
          </div>
        </div>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-xl mb-4">
          {editIndex !== null ? "Edit Horse Details" : "Add Horse Details"}
        </h2>
        <div className="flex flex-col gap-4">
          <Input
            label="Name"
            placeholder="What is the horse's name?"
            value={horseData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          <Input
            label="Breed"
            placeholder="Enter breed"
            required={true}
            value={horseData.breed}
            onChange={(e) => handleInputChange("breed", e.target.value)}
          />
          <Input
            label="Gender"
            placeholder="Enter gender"
            required={true}
            value={horseData.gender}
            onChange={(e) => handleInputChange("gender", e.target.value)}
          />
          <Input
            label="Age"
            placeholder="Enter age"
            required={true}
            value={horseData.age}
            onChange={(e) => handleInputChange("age", e.target.value)}
          />
          <Input
            label="Height"
            placeholder="Enter height"
            required={true}
            value={horseData.height}
            onChange={(e) => handleInputChange("height", e.target.value)}
          />
          <Button
            primary
            text={editIndex !== null ? "Save" : "Add"}
            onClick={handleAddHorse}
            className="mt-4 bg-primary text-white rounded"
          />
        </div>
      </Modal>

      <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <h2 className="text-xl mb-4">Confirm Delete</h2>
        <p>Are you sure you want to delete this horse?</p>
        <div className="flex justify-end gap-2 mt-4">
          <Button
            text="Cancel"
            onClick={() => setShowDeleteModal(false)}
            className="bg-gray-500 text-white rounded"
          />
          <Button
            text="Delete"
            onClick={confirmDeleteHorse}
            className="bg-red-500 text-white rounded"
          />
        </div>
      </Modal>

      {horses.length > 0 && (
        <div>
          <h2 className="text-xl mb-4">Added Horses</h2>
          <ul className="flex flex-col gap-2 py-2 divide-y divide-stone-200">
            {horses.map((horse, index) => (
              <div key={index} className="flex gap-4">
                <img
                  src="/assets/horse_head.jpg"
                  className="h-16 w-16 rounded-full"
                  alt="Horse"
                />
                <li className="flex justify-between items-center w-full">
                  <div>
                    <p className="font-semibold text-stone-800 text-base">
                      {horse.name}
                    </p>
                    <p className="text-stone-500 text-sm">{horse.breed}</p>
                  </div>
                  <div className="flex gap-4 mr-2">
                    <PencilIcon
                      className="h-6 w-6 text-stone-600 hover:text-primary transition cursor-pointer"
                      onClick={() => handleEditHorse(index)}
                    />
                    <TrashIcon
                      className="h-6 w-6 text-stone-600 hover:text-rose-500 transition cursor-pointer"
                      onClick={() => handleDeleteHorse(index)}
                    />
                  </div>
                </li>
              </div>
            ))}
          </ul>
          <Button
            primary
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleAddAnotherHorse}
          >
            Add another horse
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddHorse;