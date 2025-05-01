"use client"

import { Check, ChevronDown, ChevronLeft, ChevronRight, Loader2, Search, X } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface Option {
  value: string
  label: string
  group?: string
}

interface MultipleSelectProps {
  options: Option[]
  placeholder?: string
  onChange: (selectedOptions: string[]) => void
  values?: string[]
  isPending?: boolean
  className?: string
  disabled?: boolean
  itemsPerPage?: number
}

export const SelectMultiple: React.FC<MultipleSelectProps> = ({
  values = [],
  options,
  placeholder = "Sélectionner les options...",
  onChange,
  isPending = false,
  className,
  disabled = false,
  itemsPerPage = 5,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    values.map((value) => options.find((option) => option.value === value)).filter(Boolean) as Option[],
  )
  const [searchTerm, setSearchTerm] = useState("")
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)
  const [currentPage, setCurrentPage] = useState(0)
  const [viewMode, setViewMode] = useState<"list" | "grid" | "grouped">("list")

  const wrapperRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Update selected options when values prop changes
  useEffect(() => {
    setSelectedOptions(
      values.map((value) => options.find((option) => option.value === value)).filter(Boolean) as Option[],
    )
  }, [values, options])

  // Group options if they have a group property
  const groupedOptions = React.useMemo(() => {
    const groups: Record<string, Option[]> = {}

    const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()))

    filteredOptions.forEach((option) => {
      const group = option.group || "Autres"
      if (!groups[group]) {
        groups[group] = []
      }
      groups[group].push(option)
    })

    return groups
  }, [options, searchTerm])

  // Flat list of filtered options
  const filteredOptions = React.useMemo(
    () => options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase())),
    [options, searchTerm],
  )

  // Calculate total pages
  const totalPages = Math.ceil(filteredOptions.length / itemsPerPage)

  // Get current page items
  const currentItems = React.useMemo(() => {
    const startIndex = currentPage * itemsPerPage
    return filteredOptions.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredOptions, currentPage, itemsPerPage])

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(0)
  }, [searchTerm])

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchTerm("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          if (viewMode === "list" || viewMode === "grid") {
            setHighlightedIndex((prevIndex) => {
              const nextIndex = prevIndex < currentItems.length - 1 ? prevIndex + 1 : prevIndex
              // If we're at the end of the page, go to next page
              if (nextIndex === currentItems.length - 1 && currentPage < totalPages - 1) {
                setCurrentPage((prev) => prev + 1)
                return 0
              }
              return nextIndex
            })
          }
          break
        case "ArrowUp":
          e.preventDefault()
          if (viewMode === "list" || viewMode === "grid") {
            setHighlightedIndex((prevIndex) => {
              const nextIndex = prevIndex > 0 ? prevIndex - 1 : prevIndex
              // If we're at the start of the page, go to previous page
              if (nextIndex === 0 && prevIndex === 0 && currentPage > 0) {
                setCurrentPage((prev) => prev - 1)
                return itemsPerPage - 1
              }
              return nextIndex
            })
          }
          break
        case "Enter":
          e.preventDefault()
          if (highlightedIndex >= 0 && highlightedIndex < currentItems.length) {
            toggleOption(currentItems[highlightedIndex])
          }
          break
        case "Escape":
          e.preventDefault()
          setIsOpen(false)
          setSearchTerm("")
          break
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, highlightedIndex, currentItems, currentPage, totalPages, viewMode, itemsPerPage])

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  const toggleDropdown = () => {
    if (!disabled && !isPending) {
      setIsOpen(!isOpen)
      setHighlightedIndex(-1)
      setSearchTerm("")
      setCurrentPage(0)
    }
  }

  const toggleOption = (option: Option) => {
    if (disabled || isPending) return

    const isSelected = selectedOptions.some((item) => item.value === option.value)
    let updatedSelection: Option[]

    if (isSelected) {
      updatedSelection = selectedOptions.filter((item) => item.value !== option.value)
    } else {
      updatedSelection = [...selectedOptions, option]
    }

    setSelectedOptions(updatedSelection)
    onChange(updatedSelection.map((opt) => opt.value))
  }

  const removeOption = (e: React.MouseEvent, option: Option) => {
    e.stopPropagation()
    if (disabled || isPending) return

    const updatedSelection = selectedOptions.filter((item) => item.value !== option.value)
    setSelectedOptions(updatedSelection)
    onChange(updatedSelection.map((opt) => opt.value))
  }

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1)
      setHighlightedIndex(-1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1)
      setHighlightedIndex(-1)
    }
  }

  const isOptionSelected = (option: Option) => {
    return selectedOptions.some((item) => item.value === option.value)
  }

  return (
    <div className={cn("relative w-full", className)} ref={wrapperRef}>
      <div
        className={cn(
          "flex min-h-10 w-full flex-wrap items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
          "transition-all duration-100 ease-in-out",
          "hover:border-muted-foreground/50 focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          isOpen && "ring-2 ring-ring ring-offset-2",
          (disabled || isPending) && "cursor-not-allowed opacity-50",
          !disabled && !isPending && "cursor-pointer",
        )}
        onClick={toggleDropdown}
        tabIndex={disabled || isPending ? -1 : 0}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !disabled && !isPending) {
            e.preventDefault()
            toggleDropdown()
          }
        }}
      >
        {isPending ? (
          <div className="flex items-center text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Chargement...</span>
          </div>
        ) : selectedOptions.length === 0 ? (
          <div className="text-muted-foreground">{placeholder}</div>
        ) : (
          <div className="flex flex-wrap gap-1 max-w-full">
            {selectedOptions.map((option) => (
              <div key={option.value} className="flex items-center gap-1 bg-muted/40 rounded-md px-2 py-1 text-xs">
                <span className="truncate max-w-[150px]">{option.label}</span>
                <X
                  size={14}
                  className="flex-shrink-0 cursor-pointer text-muted-foreground hover:text-destructive transition-colors"
                  onClick={(e) => removeOption(e, option)}
                  aria-label={`Supprimer ${option.label}`}
                />
              </div>
            ))}
          </div>
        )}
        <ChevronDown
          size={16}
          className={cn(
            "ml-auto flex-shrink-0 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </div>

      {/* Dropdown menu with animation */}
      <div
        className={cn(
          "absolute z-50 w-full mt-1 bg-popover border border-input rounded-md shadow-lg",
          "transition-all duration-200 ease-in-out origin-top",
          isOpen && !isPending && !disabled
            ? "opacity-100 scale-y-100 translate-y-0"
            : "opacity-0 scale-y-95 translate-y-2 pointer-events-none",
        )}
      >
        {isOpen && !isPending && !disabled && (
          <div className="p-3">
            <div className="relative">
              <Search size={16} className="absolute left-2.5 top-2.5 text-muted-foreground" />
              <Input
                ref={searchInputRef}
                className="pl-8 pr-2 py-1 h-9 text-sm"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setHighlightedIndex(-1)
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <div className="flex items-center justify-between my-2">
              <div className="flex space-x-1">
                <Button
                type="button"
                  variant="outline"
                  size="sm"
                  className={cn("h-7 px-2", viewMode === "list" && "bg-muted")}
                  onClick={() => setViewMode("list")}
                >
                  Liste
                </Button>
                <Button
type="button"
                  variant="outline"
                  size="sm"
                  className={cn("h-7 px-2", viewMode === "grid" && "bg-muted")}
                  onClick={() => setViewMode("grid")}
                >
                  Grille
                </Button>
                <Button
                type="button"
                  variant="outline"
                  size="sm"
                  className={cn("h-7 px-2", viewMode === "grouped" && "bg-muted")}
                  onClick={() => setViewMode("grouped")}
                >
                  Groupes
                </Button>
              </div>

              {(viewMode === "list" || viewMode === "grid") && filteredOptions.length > itemsPerPage && (
                <div className="flex items-center space-x-1 text-xs">
                  <Button
type="button"
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={prevPage}
                    disabled={currentPage === 0}
                  >
                    <ChevronLeft size={14} />
                  </Button>
                  <span className="text-muted-foreground">
                    {currentPage + 1} / {totalPages}
                  </span>
                  <Button
                  type="button"
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={nextPage}
                    disabled={currentPage === totalPages - 1}
                  >
                    <ChevronRight size={14} />
                  </Button>
                </div>
              )}
            </div>

            <Separator className="my-2" />

            {filteredOptions.length > 0 ? (
              <>
                {/* List View */}
                {viewMode === "list" && (
                  <div className="max-h-[200px] overflow-hidden">
                    <ul className="space-y-1">
                      {currentItems.map((option, index) => (
                        <li
                          key={option.value}
                          className={cn(
                            "px-2 py-1.5 cursor-pointer text-sm rounded-md flex items-center justify-between",
                            "transition-colors duration-150 ease-in-out",
                            highlightedIndex === index || isOptionSelected(option)
                              ? "bg-muted text-foreground"
                              : "hover:bg-muted/50",
                          )}
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleOption(option)
                          }}
                          onMouseEnter={() => setHighlightedIndex(index)}
                          role="option"
                          aria-selected={isOptionSelected(option)}
                        >
                          <span>{option.label}</span>
                          {isOptionSelected(option) && <Check size={16} className="text-primary" />}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Grid View */}
                {viewMode === "grid" && (
                  <div className="max-h-[200px] overflow-hidden">
                    <div className="grid grid-cols-2 gap-1">
                      {currentItems.map((option, index) => (
                        <div
                          key={option.value}
                          className={cn(
                            "p-2 cursor-pointer text-sm rounded-md flex items-center justify-between",
                            "transition-colors duration-150 ease-in-out",
                            highlightedIndex === index || isOptionSelected(option)
                              ? "bg-muted text-foreground"
                              : "hover:bg-muted/50",
                          )}
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleOption(option)
                          }}
                          onMouseEnter={() => setHighlightedIndex(index)}
                          role="option"
                          aria-selected={isOptionSelected(option)}
                        >
                          <span className="truncate">{option.label}</span>
                          {isOptionSelected(option) && <Check size={16} className="text-primary flex-shrink-0 ml-1" />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Grouped View */}
                {viewMode === "grouped" && (
                  <div className="max-h-[200px] overflow-auto">
                    {Object.entries(groupedOptions).map(([group, groupOptions]) => (
                      <div key={group} className="mb-3 last:mb-0">
                        <div className="font-medium text-xs uppercase text-muted-foreground mb-1 px-2">{group}</div>
                        <ul className="space-y-1">
                          {groupOptions.map((option) => (
                            <li
                              key={option.value}
                              className={cn(
                                "px-2 py-1.5 cursor-pointer text-sm rounded-md flex items-center justify-between",
                                "transition-colors duration-150 ease-in-out",
                                isOptionSelected(option) ? "bg-muted text-foreground" : "hover:bg-muted/50",
                              )}
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleOption(option)
                              }}
                              role="option"
                              aria-selected={isOptionSelected(option)}
                            >
                              <span>{option.label}</span>
                              {isOptionSelected(option) && <Check size={16} className="text-primary" />}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="py-6 text-center text-sm text-muted-foreground">Aucun résultat trouvé</div>
            )}

            {selectedOptions.length > 0 && (
              <>
                <Separator className="my-2" />
                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs text-muted-foreground">
                    {selectedOptions.length} option{selectedOptions.length > 1 ? "s" : ""} sélectionnée
                    {selectedOptions.length > 1 ? "s" : ""}
                  </div>
                  <Button
                  type="button"
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => {
                      setSelectedOptions([])
                      onChange([])
                    }}
                  >
                    Tout effacer
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

