import { useCallback, useEffect, useState } from "react"
import { Grass } from "../types/Grass"


type GrassDto = Pick<Grass, 'id'>

const DEFAULT_GRASS_HEIGHT = 10
const GRASS_CHANGE_KEY = 'grass'
const GRASS_CHANGE_EVENT = 'grassChange'

const persistGrassGrowth = (id: number, height: number) => {
  console.log(`Persisting grass growth for id ${id} with height ${height}`)
  const storedGrass = localStorage.getItem(GRASS_CHANGE_KEY)

  if (!storedGrass) return
  const parsedGrass = JSON.parse(storedGrass) as Grass[]
  const updatedGrass = parsedGrass.map(g => g.id === id ? { ...g, height } : g)

  const newGrassForId = updatedGrass.find(g => g.id === id)
  const oldGrassForId = parsedGrass.find(g => g.id === id)
  if (newGrassForId?.height === oldGrassForId?.height) return

  localStorage.setItem(GRASS_CHANGE_KEY, JSON.stringify(updatedGrass))
  window.dispatchEvent(new CustomEvent(GRASS_CHANGE_EVENT, { detail: { id } }))
}

const generateGrassToStore = (grass: GrassDto[]): Grass[] => {
  const storedGrass = localStorage.getItem(GRASS_CHANGE_KEY)
  if (!storedGrass) return []
  const parsed = JSON.parse(storedGrass) as Grass[]

  return grass.map(g => {
    const stored = parsed.find(s => s.id === g.id)
    return stored
      ? { ...g, height: stored.height ?? DEFAULT_GRASS_HEIGHT }
      : { ...g, height: DEFAULT_GRASS_HEIGHT }
  })
}

const toDto = (grass: Grass): GrassDto => ({ id: grass.id })

export const useGrass = (): {
  grass: Grass[]
  grassDto: GrassDto[]
  addGrass: () => void
  onGrassGrow: (id: number, height: number) => void
} => {
  const [grass, setGrass] = useState<Grass[]>(() => {
    const storedGrass = localStorage.getItem(GRASS_CHANGE_KEY)
    return storedGrass ? JSON.parse(storedGrass) : []
  })
  const [grassDto, setGrassDto] = useState<GrassDto[]>(() => {
    const storedGrass = localStorage.getItem(GRASS_CHANGE_KEY)
    if (!storedGrass) return []
    const parsed = JSON.parse(storedGrass) as Grass[]
    return parsed.map(toDto)
  })

  useEffect(() => {
    const changeListener = () => {
      const storedGrass = localStorage.getItem(GRASS_CHANGE_KEY)
      console.log(storedGrass ? JSON.parse(storedGrass) : []);
      setGrass(storedGrass ? JSON.parse(storedGrass) : [])
    }

    window.addEventListener("storage", changeListener);
    window.addEventListener(GRASS_CHANGE_EVENT, changeListener);
    return () => {
      window.removeEventListener(GRASS_CHANGE_EVENT, changeListener);
      window.removeEventListener("storage", changeListener);
    };
  }, [])

  const addGrass = useCallback(() => {
    const newId = grass.length > 0 ? grass[grass.length - 1].id + 1 : 1
    const newVal =  [...grass, { id: newId, height: DEFAULT_GRASS_HEIGHT }]

    setGrass(newVal)
    setGrassDto(newVal.map(toDto))
    // setGrass((prev) => {
    //   const newId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1
    //   return [...prev, { id: newId, height: DEFAULT_GRASS_HEIGHT }]
    // })
  }, [grass])

  const onGrassGrow = useCallback(persistGrassGrowth, [])

  return {
    grass: grass,
    grassDto: grassDto,
    addGrass,
    onGrassGrow
  }
}

export const useGrassBlade = (id: number): {
  grass: Grass,
  onGrow: (height: number) => void
} => {
  const [grass, setGrass] = useState<Grass>(() => {
    const storedGrass = localStorage.getItem(GRASS_CHANGE_KEY)
    if (!storedGrass) return { id, height: DEFAULT_GRASS_HEIGHT }
    const parsed = JSON.parse(storedGrass) as Grass[]
    const found = parsed.find(g => g.id === id)
    return found ?? { id, height: DEFAULT_GRASS_HEIGHT }
  })

  useEffect(() => {
    const storedGrass = localStorage.getItem(GRASS_CHANGE_KEY)
    if (!storedGrass) return
    const parsed = JSON.parse(storedGrass) as Grass[]
    const found = parsed.find(g => g.id === id)
    if (!found) return

    setGrass(found)
  }, [id])

  useEffect(() => {
    const grassChangeListener = () => {
      const storedGrass = localStorage.getItem(GRASS_CHANGE_KEY)
      if (!storedGrass) return
      const parsed = JSON.parse(storedGrass) as Grass[]
      const found = parsed.find(g => g.id === id)
      if (!found) return
      if (found.height === grass.height) return
      setGrass(found)
    }

    window.addEventListener(GRASS_CHANGE_EVENT, grassChangeListener);
    return () => {
      window.removeEventListener(GRASS_CHANGE_EVENT, grassChangeListener);
    };
  }, [])

  useEffect(() => {
    const storageListener = () => {
      const storedGrass = localStorage.getItem(GRASS_CHANGE_KEY)
      if (!storedGrass) return
      const parsed = JSON.parse(storedGrass) as Grass[]
      const found = parsed.find(g => g.id === id)
      if (!found) return
      if (found.height === grass.height) return
      setGrass(found)
    }

    window.addEventListener("storage", storageListener);
    return () => {
      window.removeEventListener("storage", storageListener);
    };
  }, [id, grass])

  const onGrow = useCallback((height: number) => {
    setGrass((prev) => ({ ...prev, height }))
    persistGrassGrowth(id, height)
  }, [])

  return { grass, onGrow }
}
