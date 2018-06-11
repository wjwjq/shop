import * as React from 'react';
import axios from '../../lib/axios';
import CSSModules from 'react-css-modules';
import { Modal, message, Table, Button } from 'antd';

import * as styles from './style.less';
const ButtonGroup = Button.Group;

import { TableProps } from 'antd/lib/table';
import { PaginationProps } from 'antd/lib/pagination';

type TSelectedRowKeys = string[] | number[];

interface IApis {
  get?: string;
  post?: string;
  put?: string;
  del?: string;
}

interface IProps extends TableProps<object> {
  api?: string;
  apis?: IApis;
}

interface IState {
  data: object[];
  pagination: PaginationProps;
  loading: boolean;
  selectedRowKeys: TSelectedRowKeys;
  ModalText: React.ReactChild;
  visible: boolean;
  confirmLoading: boolean;
}

@CSSModules(styles)
export default class UserTable extends React.Component<IProps, IState> {
  state = {
    data: [],
    selectedRowKeys: [],
    loading: false,
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
    pagination: {
      pageSize: 10,
      current: 1,
      total: 0
    }
  };

  handleTableChange = (pagination: PaginationProps) => {
    const pager: PaginationProps = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current
    });
  }

  fetch = (params = {}) => {
    console.log('params:', params);
    // this.setState({ loading: true });

    const postedData = {
      ...params
    };

    axios
      .get(this.props.api!, postedData)
      .then((data: any) => {
        const pagination = { ...this.state.pagination };
        pagination.total = data.totalCount;
        this.setState({
          loading: false,
          data: data.results,
          pagination
        });
      });
  }

  onSelectChange = (selectedRowKeys: TSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  handleAdd = () => {
    console.log('add');
  }

  handleDelete = () => {
    Modal.confirm({
      title: 'Do you want to delete these items?',
      content: 'When clicked the OK button, this dialog will be closed after 1 second',
      onOk: () => this.deleteUser(),
      onCancel() {
        console.log('cancel');
      }
    });
  }

  deleteUser = async () => {
    try {
      await axios.del(this.props.api!, {
        id: this.state.selectedRowKeys
      });
      return Promise.resolve;
    } catch (err) {
      this.showMessage(err.message);
      return Promise.reject;
    }
  }

  handleModify = () => {
    console.log('Modify');
  }

  showMessage(msg: string, type: string = 'error') {
    message[type](msg);
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  }

  handleModalOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      });
    }, 2000);
  }

  handleModalCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false
    });
  }

  componentDidMount() {
    console.log(222);
    this.fetch();
  }

  render() {
    const { loading, pagination, data, selectedRowKeys, ModalText, visible, confirmLoading } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    return (
      <div className="curd-table">
        <div className="curd-table-header" >

          <div className="curd-table-search">
            搜索表单
          </div>

          <div className="curd-table-header-right">
            <ButtonGroup>
              <Button
                type="primary"
                icon="reload"
              >
                刷新
              </Button>
              <Button
                type="primary"
                icon="plus"
                onClick={this.handleAdd}
              >
                新增
              </Button>
              <Button
                type="primary"
                icon="edit"
                onClick={this.handleModify}
              >
                修改
              </Button>
              <Button
                type="primary"
                icon="delete"
                onClick={this.handleDelete}
              >
                删除
              </Button>
            </ButtonGroup>
          </div>
        </div>

        <Table
          {...this.props}
          rowSelection={rowSelection}
          dataSource={data}
          pagination={pagination}
          loading={loading}
          onChange={this.handleTableChange}
        />

        <Modal
          title="Title"
          visible={visible}
          onOk={this.handleModalOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleModalCancel}
        >
          <p>{ModalText}</p>
        </Modal>
      </div>
    );
  }
}
