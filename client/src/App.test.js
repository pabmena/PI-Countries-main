import App from "./App";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import NavBar from "./components/NavBar/NavBar";
import LandingPage from "./components/LandingPage/LandingPage";
import DetailCountry from "./components/DetailCountry/DetailCountry";
import Home from "./components/Home/Home";

configure({ adapter: new Adapter() });

describe("App", () => {
  let store;
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const state = {
    countries: [
      {
        id: "ARG",
        name: "Argentina",
        image: "http://argentina.png",
        region: "Americas",
      },
      {
        id: "BRA",
        name: "Brazil",
        image: "http://brazil.png",
        region: "Americas",
      },
    ],
    countryDetail: {
      id: "ARG",
      name: "Argentina",
      image: "http://argentina.png",
      region: "Americas",
    },
  };

  beforeEach(() => {
    store = mockStore(state);
  });

  describe("Details component should render in every routes except Landing Page.", () => {
    it('Should render in route "/details/:id"', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/details/:id"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(DetailCountry)).toHaveLength(0);
    });
    it('Should render in route "/countries"', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/countries"]}>
            <App />
          </MemoryRouter>

        </Provider>
      );     
      expect(wrapper.find(Home)).toHaveLength(0);
    });    
    it('Should not render on route "/"', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(LandingPage)).toHaveLength(1);
      expect(wrapper.find(NavBar)).toHaveLength(0);
    });    
  });
});