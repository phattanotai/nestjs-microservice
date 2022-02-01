import Badge from "../components/Badge.vue";
import BaseAlert from "../components/BaseAlert.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseCheckbox from "../components/BaseCheckbox.vue";
import BaseInput from "../components/BaseInput.vue";
import BaseSelect from "../components/BaseSelect.vue";
import BaseDropdown from "../components/BaseDropdown.vue";
import BaseNav from "../components/BaseNav.vue";
import BasePagination from "../components/BasePagination.vue";
import BaseProgress from "../components/BaseProgress.vue";
import BaseRadio from "../components/BaseRadio.vue";
import BaseSlider from "../components/BaseSlider.vue";
import BaseSwitch from "../components/BaseSwitch.vue";
import BaseTable from "../components/BaseTable.vue";
import BaseHeader from "../components/BaseHeader.vue";
import Card from "../components/Card.vue";
import StatsCard from "../components/StatsCard.vue";
import Modal from "../components/Modal.vue";
import TabPane from "../components/Tabs/TabPane.vue";
import Tabs from "../components/Tabs/Tabs.vue";

export default {
  install(app: any) {
    app.component(Badge.name, Badge);
    app.component(BaseAlert.name, BaseAlert);
    app.component(BaseButton.name, BaseButton);
    app.component(BaseInput.name, BaseInput);
    app.component(BaseSelect.name, BaseSelect);
    app.component(BaseNav.name, BaseNav);
    app.component(BaseDropdown.name, BaseDropdown);
    app.component(BaseCheckbox.name, BaseCheckbox);
    app.component(BasePagination.name, BasePagination);
    app.component(BaseProgress.name, BaseProgress);
    app.component(BaseRadio.name, BaseRadio);
    app.component(BaseSlider.name, BaseSlider);
    app.component(BaseSwitch.name, BaseSwitch);
    app.component(BaseTable.name, BaseTable);
    app.component(BaseHeader.name, BaseHeader);
    app.component(Card.name, Card);
    app.component(StatsCard.name, StatsCard);
    app.component(Modal.name, Modal);
    app.component(TabPane.name, TabPane);
    app.component(Tabs.name, Tabs);
  },
};
