import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;

  .modal {
    background-color: white;
    width: 80%;
    z-index: 100;
    overflow: hidden;
    padding: 0;
    @media (min-width: 768px) {
      width: 40rem;
    }
  }
  img {
    width: 100%;
  }

  .content {
    padding: 2rem;
  }

  .form-actions {
    display: flex;
    justify-content: space-between;
  }
`;

export const CardBody = styled.div`
  padding: 2rem;
`;

export const ProductSearchResults = styled.ul`
  flex-flow: row wrap;
  display: flex;
  margin: 0 -1rem;

  li {
    max-width: 100%;
    flex: 0 1 100%;
    padding: 0 1rem;
    margin-bottom: 2rem;

    @media (min-width: 400px) {
      max-width: 50%;
      flex: 0 1 50%;
    }

    @media (min-width: 768px) {
      max-width: 33%;
      flex: 0 1 33%;
    }

    @media (min-width: 972px) {
      max-width: 25%;
      flex: 0 1 25%;
    }
  }

  a {
    height: 100%;
    display: block;
    &:hover,
    &:focus {
      text-decoration: none;
    }
  }

  .product-card,
  .product-card__body {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .product-card__body {
    flex: 1;
  }

  .product-card__body .button {
    margin-top: auto;
  }
`;

export const ProductDetails = styled.div`
  @media (min-width: 972px) {
    .product-card {
      display: flex;
      flex-flow: row nowrap;
      img {
        width: auto;
      }
    }
    .product-card__body {
      padding-left:5rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
  }
`;

export const Form = styled.form`
  margin: 5rem -2rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-end;

  .controls {
    width: 100%;
    flex: 0 1 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      margin: 0 2rem 2rem;
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }
`;

export const FieldGroup = styled.div`
  padding: 0 2rem;
  margin-bottom: 2rem;

  label,
  input:not([type="checkbox"]),
  select {
    width: 100%;
  }

  max-width: 100%;
  flex: 0 1 100%;

  @media (min-width: 768px) {
    max-width: 33%;
    flex: 0 1 33%;
  }

  @media (min-width: 972px) {
    max-width: 25%;
    flex: 0 1 25%;
  }
`;
