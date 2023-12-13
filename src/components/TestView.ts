import { ViewBase } from "./bases/ViewBase";
import { ViewId } from '@constants/ViewId';

export class TestView extends ViewBase {
  constructor() {
    super(ViewId.TEST, 2);
  }
}