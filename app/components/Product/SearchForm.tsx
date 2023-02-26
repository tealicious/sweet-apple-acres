import React from "react";
import { ProductSearchQueryParams } from "~/types/services";
import { Form, FieldGroup } from "~/components/UI/UI";

interface SearchParamsProps {
  searchParams: ProductSearchQueryParams;
}

export default function ProductSearchForm({ searchParams }: SearchParamsProps) {

  const [formValues, setFormValues] = React.useState(searchParams);
  const [isAvailableChecked, setIsAvailableChecked] = React.useState(
    formValues.isAvailable === "true"
  );

  const searchFormRef = React.useRef<HTMLFormElement>(null);

  function updateFormValue(
    parameterLabel: string,
    e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>
  ) {
    setFormValues((initialState) => {
      const newState = initialState;
      const newFieldValue = e.target.value;
      //@ts-ignore
      newState[parameterLabel] = newFieldValue;
      return { ...newState };
    });
  }

  async function resetProductSearch() {
    if (!searchFormRef.current) return;
    await setFormValues((initialState) => {
      const newState = initialState;
      Object.keys(newState).forEach(function (key) {
        //@ts-ignore
        newState[key] = "";
      });
      return { ...newState };
    });
    await setIsAvailableChecked(false);
    searchFormRef.current.submit();
  }

  function toggleAvailableProducts() {
    setIsAvailableChecked((initialState) => !initialState);
  }

  return (
    <Form
      ref={searchFormRef}
      aria-label="use this form to filter the product search results for this page"
    >
      <FieldGroup>
        <label htmlFor="search">Search</label>
        <input
          type="text"
          name="search"
          id="search"
          onChange={(e) => {
            updateFormValue("search", e);
          }}
          value={formValues.search}
        ></input>
      </FieldGroup>

      <FieldGroup>
        <label htmlFor="minRating">Min Rating</label>
        <input
          type="number"
          max="5"
          min="1"
          name="minRating"
          id="minRating"
          onChange={(e) => {
            updateFormValue("minRating", e);
          }}
          value={formValues.minRating}
        ></input>
      </FieldGroup>

      <FieldGroup>
        <label htmlFor="maxRating">Max Rating</label>
        <input
          type="number"
          max="5"
          min="1"
          name="maxRating"
          id="maxRating"
          onChange={(e) => {
            updateFormValue("maxRating", e);
          }}
          value={formValues.maxRating}
        ></input>
      </FieldGroup>

      <FieldGroup>
        <label htmlFor="minPrice">Min Price $</label>
        <input
          type="number"
          min="0"
          name="minPrice"
          id="minPrice"
          onChange={(e) => {
            updateFormValue("minPrice", e);
          }}
          value={formValues.minPrice}
        ></input>
      </FieldGroup>

      <FieldGroup>
        <label htmlFor="maxPrice">Max Price $</label>
        <input
          type="number"
          min="0"
          name="maxPrice"
          id="maxPrice"
          onChange={(e) => {
            updateFormValue("maxPrice", e);
          }}
          value={formValues.maxPrice}
        ></input>
      </FieldGroup>

      <FieldGroup>
        <label htmlFor="limit">Results Limit</label>
        <input
          type="number"
          min="0"
          name="limit"
          id="limit"
          value={formValues.limit}
          onChange={(e) => {
            updateFormValue("limit", e);
          }}
        ></input>
      </FieldGroup>

      <FieldGroup>
        <label htmlFor="orderBy">Order results by:</label>
        <select
          id="orderBy"
          name="orderBy"
          value={formValues.orderBy}
          onChange={(e) => {
            updateFormValue("orderBy", e);
          }}
        >
          <option value="">Select to order</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
      </FieldGroup>

      {formValues.orderBy && (
        <FieldGroup>
          <label htmlFor="sort">Sort ordered results by:</label>
          <select
            id="sort"
            name="sort"
            value={formValues.sort}
            onChange={(e) => {
              updateFormValue("sort", e);
            }}
          >
            <option value="">Select to sort</option>
            <option value="DESC">Descending order</option>
            <option value="ASCE">Ascending order</option>
          </select>
        </FieldGroup>
      )}

      <FieldGroup>
        <label htmlFor="isAvailable">
          Show Products Available For Purchase Only
        </label>
        <input
          id="isAvailable"
          name="isAvailable"
          type="checkbox"
          checked={isAvailableChecked}
          value="true"
          onChange={toggleAvailableProducts}
        />
      </FieldGroup>

      <div className="controls">
        <button type="submit">Filter Results</button>
        <button
          type="button"
          className="button-secondary"
          onClick={resetProductSearch}
        >
          Clear Filters
        </button>
      </div>
    </Form>
  );
}
