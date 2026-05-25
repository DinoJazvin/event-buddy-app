import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Container
} from "@chakra-ui/react"
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Creating event:', formData)
    // Add logic to call your Express backend here
  }

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" textAlign="center" color={'blackAlpha.800'}>Event Buddy</Heading>
        
        <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Event Title</FormLabel>
                <Input 
                  name="title"
                  placeholder="Enter event title" 
                  value={formData.title}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Date</FormLabel>
                <Input 
                  name="date"
                  type="date" 
                  value={formData.date}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Location</FormLabel>
                <Input 
                  name="location"
                  placeholder="Enter location" 
                  value={formData.location}
                  onChange={handleChange}
                />
              </FormControl>

              <Button 
                type="submit" 
                colorScheme="blue" 
                width="full" 
                mt={4}
              >
                Create Event
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  )
}

export default App
